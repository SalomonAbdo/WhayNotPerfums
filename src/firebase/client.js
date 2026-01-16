// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9rMUJKtugINYf9UiTj5nBK8MfJUi_aJA",
  authDomain: "wnpp-991c5.firebaseapp.com",
  projectId: "wnpp-991c5",
  storageBucket: "wnpp-991c5.firebasestorage.app",
  messagingSenderId: "574852005472",
  appId: "1:574852005472:web:d9b4c16abec9fd12044d05",
  measurementId: "G-DVDWN84GV2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
