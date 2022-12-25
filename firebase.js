// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_V9i0Ixazh8xPH7gvxywPKgAZshgl6Vw",
  authDomain: "viber-30b6c.firebaseapp.com",
  projectId: "viber-30b6c",
  storageBucket: "viber-30b6c.appspot.com",
  messagingSenderId: "1086767787063",
  appId: "1:1086767787063:web:7e3bd78e8f7294c302a3b2",
  measurementId: "G-TX55Z4Y6CX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth();
const db=getFirestore();
export{auth,db}