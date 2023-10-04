import { useState } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";


function login(email, password) {
  
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
    return user

  })
  .catch((error) => {
    console.log(error)
  });

}

function signUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...

  })
  .catch((error) => {
    console.log(error)
  });
}

function logout() {
    signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}

module.export = { login, signUp, logout }