// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFXtAgPRbgVRnteSZKsSqYTkuKUw5R_oM",
  authDomain: "tinder-clone-5e399.firebaseapp.com",
  projectId: "tinder-clone-5e399",
  storageBucket: "tinder-clone-5e399.appspot.com",
  messagingSenderId: "18130385744",
  appId: "1:18130385744:web:e4738469e5bc2677c54a55",
  measurementId: "G-HXTW0N5D25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);