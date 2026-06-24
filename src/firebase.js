import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2DFxAqMA5-WNTNyDNKs_9Wu6pSPGQYDM",
  authDomain: "wedding-invitation-1c381.firebaseapp.com",
  projectId: "wedding-invitation-1c381",
  storageBucket: "wedding-invitation-1c381.firebasestorage.app",
  messagingSenderId: "730625322611",
  appId: "1:730625322611:web:a1d72f9cca3ea11b29c406",
  measurementId: "G-GKJX3N02ML"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firestore Database
const db = getFirestore(app);

export { db };
