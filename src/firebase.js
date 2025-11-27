import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8dFDdrXd8ViHFi7_kZ5-sdunCPwolIRw",
  authDomain: "food-menu-app-62100.firebaseapp.com",
  projectId: "food-menu-app-62100",
  storageBucket: "food-menu-app-62100.appspot.com",
  messagingSenderId: "542350238898",
  appId: "1:542350238898:web:42158560ca34d41d5095ab"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// 🔥 Google provider
export const googleProvider = new GoogleAuthProvider();



