// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
   createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up
    console.log('Credenciales', userCredential) 
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    console.log(error.code, error.message);
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  }); 
}
