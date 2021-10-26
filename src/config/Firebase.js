import { initializeApp, } from "firebase/app";
import { getAuth,updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore,
  doc,
  arrayUnion,
  updateDoc,
  increment ,
  setDoc,
  getDoc,
  getDocs,
   collection,
    query, where, onSnapshot, addDoc, orderBy } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAn0LvAy4v1VJxVAzaVdl6Tfi1I_sRe4sQ",
  authDomain: "chat-app-14547.firebaseapp.com",
  databaseURL: "https://chat-app-14547-default-rtdb.firebaseio.com",
  projectId: "chat-app-14547",
  storageBucket: "chat-app-14547.appspot.com",
  messagingSenderId: "761689215604",
  appId: "1:761689215604:web:141e7adf4f265b952bf721",
  measurementId: "G-TVTLH4VSLC"
};

initializeApp(firebaseConfig)

const auth = getAuth();
const db = getFirestore();

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    db,
    doc,
    setDoc,
    getDoc,
    getDocs,
    collection,
    query,
    where,
    onSnapshot,
    addDoc,
    orderBy,
    arrayUnion,
    updateDoc,
    increment,
    updateProfile
};