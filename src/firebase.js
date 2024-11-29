// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCAQ1Tglfca0N2hkLCCIMM7Ha7n9WTyPLY",
    authDomain: "todo-react-ddb66.firebaseapp.com",
    projectId: "todo-react-ddb66",
    storageBucket: "todo-react-ddb66.firebasestorage.app",
    messagingSenderId: "730506870620",
    appId: "1:730506870620:web:b95ee23fa8bd72fccd0b99",
    measurementId: "G-30DT4QP8GK"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, deleteDoc, doc, updateDoc };


