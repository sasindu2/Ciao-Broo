import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBfg9Ptz7xhYdgXxbxPD2qzX4tbmlQfDdM",
  authDomain: "ciao-broo.firebaseapp.com",
  projectId: "ciao-broo",
  storageBucket: "ciao-broo.firebasestorage.app",
  messagingSenderId: "22142978780",
  appId: "1:22142978780:web:88d7ba34b81a37668b0219",
  measurementId: "G-N248S00JM8"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); 