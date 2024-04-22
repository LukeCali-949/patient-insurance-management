// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2DsY1qKuW-ZfQKUUobFTWCf5HBbVGqXE",
  authDomain: "patient-and-insurance-ma-53708.firebaseapp.com",
  projectId: "patient-and-insurance-ma-53708",
  storageBucket: "patient-and-insurance-ma-53708.appspot.com",
  messagingSenderId: "688952269771",
  appId: "1:688952269771:web:b522ed435eb875085d744e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const storage = getStorage(app);

export const getStorageRef = (path) => {
  return ref(storage, path);
};

const auth = getAuth(app);

export { auth };
