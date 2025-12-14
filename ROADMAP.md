## Currency Converter - enhancements

##### Enhancement for features:

1. The dummy currency rate generate could be replaced with real API call to get real FX rates.

2. There could be more currencies to be added for conversion (a dedicated dropdown for the origin & target fields for users to choose). 

3. The conversion logic for each new currencies (see pt.2) could be better refactored into dedicated services or util files for better code quality and modularity, and implement strategy patterns for currency pairs if they have specific rules (for example, if for currency X and Y the override rule is 3% instead of 2%)

4. The conversion history table could be customized to display more or less rows if needed (a spinner users can customized; default 5)

5. There could be charts displayed to show the history of evolution of the selected FX rate, so that users can quickly grasp the recent changes in FX (we can use libraries such as Highcharts)

6. We could have an alert icon if the conversion rate for the given currencies pais has been fluctuating far above average rate to alert users

7. We can have quick buttons to propose often-used round currency values (such as 1K)



##### Enhancements users would not directly see, but good for code quality:

1. Adding automated and unit tests would be very useful and mandatory to ensure code is bug free and high quality

2. Code with dedicated logics can be better refactored into dedicated files for reuse & better separation of concerns. We can build progressively libraries for commonly used features that could be reused for future similar use cases.