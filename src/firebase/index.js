import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAAsNKfJXey-B5WDNV8QWiGVMXSKHP3mw",
  authDomain: "secret-santa-app-19e37.firebaseapp.com",
  projectId: "secret-santa-app-19e37",
  storageBucket: "secret-santa-app-19e37.appspot.com",
  messagingSenderId: "1079332805817",
  appId: "1:1079332805817:web:71c22280082ae70f118f68",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
