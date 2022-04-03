// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD84oB9LHsOviVYDlas4GF-fOrbHMdzGQw",
  authDomain: "euphoria-d8934.firebaseapp.com",
  databaseURL: "https://euphoria-d8934-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "euphoria-d8934",
  storageBucket: "euphoria-d8934.appspot.com",
  messagingSenderId: "1064970774921",
  appId: "1:1064970774921:web:1c59f1340919e2563ed958",
  measurementId: "G-RLWYYCK7NT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);