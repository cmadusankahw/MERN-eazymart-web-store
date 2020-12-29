import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAICf0Ykl6BkFDyV1nIJ_AEAXvOt0M0wL4",
  authDomain: "eazymart-webstore.firebaseapp.com",
  projectId: "eazymart-webstore",
  storageBucket: "eazymart-webstore.appspot.com",
  messagingSenderId: "52379571823",
  appId: "1:52379571823:web:9dfdf83a8ba837ea305f9a",
  measurementId: "G-V30LWCS6B0",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
