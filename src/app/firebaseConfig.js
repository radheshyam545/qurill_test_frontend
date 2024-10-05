// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// messaging
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwSET4MDtm8j47a806q90yGvfo_m_cnlQ",
  authDomain: "qruil-7672e.firebaseapp.com",
  projectId: "qruil-7672e",
  storageBucket: "qruil-7672e.appspot.com",
  messagingSenderId: "1099009063358",
  appId: "1:1099009063358:web:7fc366b5ac0feed28c21ef",
  measurementId: "G-EQ8MLN3K5M"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// messaging
export const messaging = getMessaging(app);