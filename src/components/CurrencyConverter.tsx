import { useState } from 'react';
import { useEurUsdRate } from '../hooks/useEurUsdRate';
import { getEffectiveRate } from '../utils/rateUtils';
import styles from './CurrencyConverter.module.css';

type ConversionMode = 'EUR' | 'USD';

interface ConversionHistory {
  id: number;
  timestamp: Date;
  realTimeRate: number;
  overrideRate: number | null;
  fromAmount: number;
  fromCurrency: string;
  toAmount: number;
  toCurrency: string;
}

export const CurrencyConverter = () => {
  const [inputAmount, setInputAmount] = useState<string>('');
  const [mode, setMode] = useState<ConversionMode>('EUR');
  const [overrideRateInput, setOverrideRateInput] = useState<string>('');
  const [history, setHistory] = useState<ConversionHistory[]>([]);
  const realTimeRate = useEurUsdRate();
  
  // Determine which rate to use for conversion
  const overrideRate = overrideRateInput ? parseFloat(overrideRateInput) : null;
  const { rate, isUsingOverride } = getEffectiveRate(overrideRate, realTimeRate);

  const calculateOutput = (): string => {
    const amount = parseFloat(inputAmount);
    if (isNaN(amount) || inputAmount === '') {
      return '0.00';
    }
    if (mode === 'EUR') {
      // EUR to USD
      return (amount * rate).toFixed(2);
    } else {
      // USD to EUR
      return (amount / rate).toFixed(2);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty string, numbers, and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setInputAmount(value);
      
      // Add to history if valid conversion
      const amount = parseFloat(value);
      if (!isNaN(amount) && amount > 0) {
        const output = mode === 'EUR' ? amount * rate : amount / rate;
        
        const newEntry: ConversionHistory = {
          id: Date.now(),
          timestamp: new Date(),
          realTimeRate,
          overrideRate: isUsingOverride ? overrideRate : null,
          fromAmount: amount,
          fromCurrency: mode,
          toAmount: output,
          toCurrency: mode === 'EUR' ? 'USD' : 'EUR',
        };

        setHistory(prev => {
          const updated = [newEntry, ...prev];
          return updated.slice(0, 5);
        });
      }
    }
  };

  const handleOverrideRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty string, numbers, and up to 4 decimal places
    if (value === '' || /^\d*\.?\d{0,4}$/.test(value)) {
      setOverrideRateInput(value);
    }
  };

  const handleModeToggle = () => {
    // Swap the values: output becomes new input
    const currentOutput = calculateOutput();
    setInputAmount(currentOutput === '0.00' ? '' : currentOutput);
    setMode(mode === 'EUR' ? 'USD' : 'EUR');
  };


  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.card}>
          <h1 className={styles.title}>Currency Converter</h1>
        
        <div className={styles.rateDisplay}>
          <span className={styles.rateLabel}>Real-time Rate:</span>
          <span className={styles.rateValue}>1 EUR = {realTimeRate.toFixed(4)} USD</span>
        </div>

        <div className={styles.overrideSection}>
          <label htmlFor="overrideRate" className={styles.overrideLabel}>
            Override FX Rate (optional)
          </label>
          <div className={styles.overrideInputWrapper}>
            <input
              id="overrideRate"
              type="text"
              value={overrideRateInput}
              onChange={handleOverrideRateChange}
              placeholder={realTimeRate.toFixed(4)}
              className={styles.overrideInput}
            />
            {overrideRateInput && (
              <div className={`${styles.overrideStatus} ${
                isUsingOverride ? styles.statusValid : styles.statusInvalid
              }`}>
                {isUsingOverride 
                  ? '✓ Override active' 
                  : '⚠ Override disabled (>2% difference)'}
              </div>
            )}
          </div>
        </div>

        <div className={styles.activeRateInfo}>
          <span className={styles.activeRateLabel}>Active Rate:</span>
          <span className={styles.activeRateValue}>
            1 EUR = {rate.toFixed(4)} USD
            {isUsingOverride && <span className={styles.overrideBadge}>Custom</span>}
          </span>
        </div>

        <div className={styles.modeSwitch}>
          <button
            className={`${styles.modeButton} ${mode === 'EUR' ? styles.active : ''}`}
            onClick={() => mode !== 'EUR' && handleModeToggle()}
          >
            EUR → USD
          </button>
          <button
            className={`${styles.modeButton} ${mode === 'USD' ? styles.active : ''}`}
            onClick={() => mode !== 'USD' && handleModeToggle()}
          >
            USD → EUR
          </button>
        </div>

        <div className={styles.converterSection}>
          <div className={styles.inputGroup}>
            <label htmlFor="currencyInput" className={styles.label}>
              Amount in {mode}
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.currency}>{mode === 'EUR' ? '€' : '$'}</span>
              <input
                id="currencyInput"
                type="text"
                value={inputAmount}
                onChange={handleInputChange}
                placeholder="0.00"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.arrow}>→</div>

          <div className={styles.outputGroup}>
            <label className={styles.label}>Amount in {mode === 'EUR' ? 'USD' : 'EUR'}</label>
            <div className={styles.outputWrapper}>
              <span className={styles.currency}>{mode === 'EUR' ? '$' : '€'}</span>
              <span className={styles.output}>{calculateOutput()}</span>
            </div>
          </div>
        </div>
        </div>

        <div className={styles.historySection}>
          <h2 className={styles.historyTitle}>Conversion History (Last 5)</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.historyTable}>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Real-time Rate</th>
                  <th>Override Rate</th>
                  <th>From</th>
                  <th>To</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, index) => {
                  const entry = history[index];
                  return entry ? (
                    <tr key={entry.id}>
                      <td className={styles.timeCell}>
                        {entry.timestamp.toLocaleTimeString()}
                      </td>
                      <td>{entry.realTimeRate.toFixed(4)}</td>
                      <td>
                        {entry.overrideRate ? (
                          <span className={styles.overrideActive}>
                            {entry.overrideRate.toFixed(4)}
                          </span>
                        ) : (
                          <span className={styles.noOverride}>—</span>
                        )}
                      </td>
                      <td>
                        <span className={styles.amount}>
                          {entry.fromAmount.toFixed(2)}
                        </span>
                        <span className={styles.currencyLabel}>
                          {entry.fromCurrency}
                        </span>
                      </td>
                      <td>
                        <span className={styles.amount}>
                          {entry.toAmount.toFixed(2)}
                        </span>
                        <span className={styles.currencyLabel}>
                          {entry.toCurrency}
                        </span>
                      </td>
                    </tr>
                  ) : (
                    <tr key={`empty-${index}`} className={styles.emptyRow}>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
