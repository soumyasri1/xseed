import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Add your Firebase configuration details here
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDeZNvSKBmO8djPisPPlF-_snDx2YLzac",
  authDomain: "edtech-6e08f.firebaseapp.com",
  databaseURL: "https://edtech-6e08f-default-rtdb.firebaseio.com",
  projectId: "edtech-6e08f",
  storageBucket: "edtech-6e08f.appspot.com",
  messagingSenderId: "499483393294",
  appId: "1:499483393294:web:fa0b3449126b93b2d06b5f",
  measurementId: "G-HH57VGG8SB",
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
