### Currency Converter - implemented features summary

0. I used `npx create-vite@latest my-vite-app -- --template react-ts` to quickly build a starting template for React app.

1. I started with creating the logic for a dummy EUR/USD fx rate provider function, as the display will depend on it. Since it is some very specific behaviour with initial value & changes in time (and possibly, replaced in the future by real API calls), it was a good idea to have a dedicated file for it, for better maintainance and code modularity. The feature is implemented using a custom hook: useEurUsdRate.

2. The next step is to create a basic React component so that users will be able to enter the amounts in EUR and see the conversion. Since time is limited and this will consist of mostly boilerplace JSX with basic states interactions/udpates, I used Github Copilot to help me accelerate the development by providing the basic template for a quick first overview and a basic elements. The component is CurrencyConverter, which is imported inside App.tsx 


3. I then enhance the component with more advanced features, such as the swapping of the conversion direction, the live updates for the converted currency amount, and the overrides. There are also some sanity input checks added, for example only numbers are accepted, with dedicated regex conditions.

4. For more specific functions dedicated to handle the currency rate overrides & computing the effective rate depending on the 2% difference rule, I have created a util file (rateUtils) to avoid having too much code in the componennt file

5. Finally for the historical conversions table, I decided to have a separate section for better readability

6. CSS styling has been applied to ensure that the interface is easy to use while being esthetically pleasant. Since time is limited, I used Copilot again to propose some ready-to-use themes so I can quickly visualize and choose one that I can customize to have a final rendering. The themes are inside a dedicated .module.css for the CurrencyConverter, so that it stays isolated from the rest of the application in case other components are added in the future.