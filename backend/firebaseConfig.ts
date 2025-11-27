import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCFSMLUTLr2ZadrdUdBggDI50fgivJWx8",
  authDomain: "tryesp32-e0901.firebaseapp.com",
  databaseURL: "https://tryesp32-e0901-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tryesp32-e0901",
  storageBucket: "tryesp32-e0901.firebasestorage.app",
  messagingSenderId: "238204768867",
  appId: "1:238204768867:web:a7dcc98c4f4c56b5f29e56"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);