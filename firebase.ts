// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC09feZ7O3nLa1jM6KQVFajXGOUuCDVWLA",
  authDomain: "reacttodoapp-ffe2e.firebaseapp.com",
  projectId: "reacttodoapp-ffe2e",
  storageBucket: "reacttodoapp-ffe2e.appspot.com",
  messagingSenderId: "322193750135",
  appId: "1:322193750135:web:a0d96e6fa222cd6293ae72",
  measurementId: "G-C7LF6NSGEV",
};

// Initialize Firebase
// let app;
// if(firebase.apps.length === 0) {
//     app = firebase.initializeApp(firebaseConfig);
// } else {
//     app = firebase.app()
// }
initializeApp(firebaseConfig);

// const databaseRef = firebase.database().ref();
// export const todosRef = databaseRef.child("todos")
// export default firebase;
