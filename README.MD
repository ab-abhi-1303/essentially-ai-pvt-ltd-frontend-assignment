# Frontend Task Essentially AI

## Server Side
1. Made a POST API named `fetchStockData` which handles the input that came from frontend and makes a GET request to Polygon API correspondingly.
2. This API handles different edge cases with respect to response codes that we might recieve as response.
3. Only required fields are sent as response from the API.

## Client Side
1. Created a Form with 2 input fields namely- Stock Symbol and Date.
2. User cannot hit Submit button unless both fields have input.
3. If API is unable to get valid response, we show alert box for the user to enter different input.
4. If API gets data successfully, we display that on the UI in a separate box.
5. Slow Animation of Form while loading page for visual appealness.
6. Google Font added for Better Styling.
7. Even if user enters stock symbol in lowercase, we convert it into uppercase and then send an API request.
8. Date cannot be more than today. For Sat/Sun, API does not give response as stock markets are closethese 2 days.
