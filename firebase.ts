// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "surveyresults-52917.firebaseapp.com",
  projectId: "surveyresults-52917",
  storageBucket: "surveyresults-52917.appspot.com",
  messagingSenderId: "961958899129",
  appId: "1:961958899129:web:198461e0e1c151b2191a68",
  measurementId: "G-WHFQKFZTYL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
