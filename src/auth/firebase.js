// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDOhu8sfNR5Sf9a81MShLP7LDCstEvypY",
  authDomain: "prueba-auth-22c59.firebaseapp.com",
  projectId: "prueba-auth-22c59",
  storageBucket: "prueba-auth-22c59.firebasestorage.app",
  messagingSenderId: "391760238184",
  appId: "1:391760238184:web:98707cb3fd583fc015cddd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export function crearUsuario(email, password){
  return(
    new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      resolve(user);
    // ...
  })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      reject(error);
      // ..
      });   
    })
  );
};

export function loginConMailyPass(email, password) {
  return(
    new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      resolve(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(error);
      });  
    })
  );
};
