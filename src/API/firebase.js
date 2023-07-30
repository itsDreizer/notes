import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  setPersistence,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import { getFirestore, addDoc, collection, getDocs, setDoc, doc } from "firebase/firestore";

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
  static #db = getFirestore(this.#app);

  static createUser(email, password, nickname) {
    const response = createUserWithEmailAndPassword(this.#auth, email, password)
      .then((userCredential) => {
        this.user = userCredential.user;
        this.username = nickname;
        updateProfile(this.user, {
          displayName: nickname,
        }).catch((e) => {
          console.log(e);
        });
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
        this.username = userCredential.user.displayName;

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

  static checkAuth() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.#auth, (user) => {
        if (user) {
          this.user = user;
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  static async addNote(title, body) {
    try {
      await setDoc(doc(collection(this.#db, this.user.uid)), {
        title,
        body,
      });
    } catch (e) {
      console.log("Error adding document: ", e);
    }
  }

  static async getAllNotes() {
    try {
      const result = [];
      const querySnapshot = await getDocs(collection(this.#db, this.user.uid));
      querySnapshot.forEach((note) => {
        const noteObject = { id: note.id, ...note.data() };
        result.push(noteObject);
      });
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  static async getCategories() {}

  static async getNote() {}
}
