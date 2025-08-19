import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBC6GSe_7DGPtsPTxgJUnelRx9lyyAwsNw",
  authDomain: "profile1808.firebaseapp.com",
  projectId: "profile1808",
  storageBucket: "profile1808.appspot.com",
  messagingSenderId: "522893137626",
  appId: "1:522893137626:web:19aafdacfdfa24d999f7e3",
  measurementId: "G-S6F12CHV1C"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
