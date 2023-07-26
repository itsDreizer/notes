import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  setPersistence,
  signOut,
} from "firebase/auth";

export class FireBase {
  static #firebaseConfig = {
    apiKey: "AIzaSyBiP49dOfTsq7UKUmSTvM5_IpMuUKVJT-o",
    authDomain: "notes-93604.firebaseapp.com",
    projectId: "notes-93604",
    storageBucket: "notes-93604.appspot.com",
    messagingSenderId: "250204351617",
    appId: "1:250204351617:web:2f153473b9bef254fff180",
    measurementId: "G-1D26SXH3BK",
  };

  static #app = initializeApp(this.#firebaseConfig);
  static #auth = getAuth();

  static settedPersistence = setPersistence(this.#auth, browserLocalPersistence);

  static createUser(email, password) {
    const response = createUserWithEmailAndPassword(this.#auth, email, password)
      .then((userCredential) => {
        this.user = userCredential.user;
        return { data: userCredential };
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        return { error: errorMessage };
      });
    return response;
  }

  static login(email, password) {
    const response = signInWithEmailAndPassword(this.#auth, email, password)
      .then((userCredential) => {
        this.user = userCredential.user;
        return { data: userCredential };
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        return { error: errorMessage };
      });
    return response;
  }

  static logout() {
    signOut(this.#auth);
  }

  static log() {
    console.log(this.#auth);
  }
}
