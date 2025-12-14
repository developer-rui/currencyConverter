### This is a currency converter made for the following assignment:

1. Display a result corresponding to EUR/USD fx rate. It will be set to 1.1 by default.
Every 3 seconds, a random value comprised between -0.05 and +0.05 will be added to (or subtracted
from) the initial value.
2. Build a Front page in React allowing the user to enter an amount in EUR and displaying the converted
value in USD, taking the fx rate into account.
3. Implement a polling allowing the update of the USD part depending on the fx rate.
4. Add a switch to enter an amount in USD instead of EUR:
a. Switch set to &quot;EUR&quot;: the amount is entered in EUR and result value in USD
b. Switch set to &quot;USD&quot;: the amount is entered in USD and result value in EUR
5. Make sure there is a continuity in the values: when the switch is activated the former output should
become the new entry.
6. Add a field to override the fx rate.
7. Deactivate the override on the fx rate (if activated) when there is a 2% difference with the real time
fx rate. The conversion should then be done using the real time one.
8. Display a table with historical data of the 5 last results (corresponding to the 5 last conversions).
9. This table should display: the real time fx rate, the override, the initial amount with associated
currency and the converted one with the associated currency.