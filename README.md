# Eazymart Web store

Fully functional e-commerce web-store with real-time payments processing, user authentication, cart-add, and checkout features, build with React JS and Firebase...

## Technology Stack

- ReactJs
- React Context API (REDUX)
- Firebase Authentication
- Firebase Cloud Firestore Database
- Payment Processing
- Firebase Hosting
- Payment Processing with **Stripe.js**

## Available Scripts

In the project directory, navigate to `frontend` and run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Running backend

### Run Backend on emulators

Backend can be runon firebase cloud functions emulator for testing.  
Navigate to the project directory, then to `functions` and run,

`firebase emulators:start`

### Deploy the project

To deploy front-end, navigate to the `app` Directory and run

`firebase deploy --only hosting`

To deploy back-end, navigate to the `functions` Directory and run

`firebase deploy --only functions`

Note: You may require login to firebase first!

## Project Screenshots

<img src="screenshots/1.png" width="800"/>
<img src="screenshots/2.png" width="800"/>
<img src="screenshots/3.png" width="800"/>
<img src="screenshots/4.png" width="800"/>
<img src="screenshots/5.png" width="800"/>
<img src="screenshots/6.png" width="800"/>
