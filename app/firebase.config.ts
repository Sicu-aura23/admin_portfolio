// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcCctq5vzVTaXlAEM6yF_pSa3W7tzuBDc",
  authDomain: "sicu-aura-2ffac.firebaseapp.com",
  projectId: "sicu-aura-2ffac",
  storageBucket: "sicu-aura-2ffac.appspot.com",
  messagingSenderId: "959535583090",
  appId: "1:959535583090:web:a32e19563d686c9f2d57eb",
  measurementId: "G-5QWZ6NY8KR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);