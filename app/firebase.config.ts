// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
const measurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;

const firebaseConfig = {
  apiKey: "AIzaSyDcCctq5vzVTaXlAEM6yF_pSa3W7tzuBDc",
  authDomain: "sicu-aura-2ffac.firebaseapp.com",
  projectId: "sicu-aura-2ffac",
  storageBucket: "sicu-aura-2ffac.appspot.com",
  messagingSenderId: "959535583090",
  appId: "1:959535583090:web:0e51ce77f145a81c2d57eb",
  measurementId: "G-BXPD03TC9D"
};

// Initialize Firebase
const app =  firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
// firestore.settings({ timestampsInSnapshots: true, merge: true });
const db = getFirestore(app);
const storage = getStorage(app);
const storageRef = ref(storage);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
export { db, auth, provider, firestore, storage, storageRef, app as default }
