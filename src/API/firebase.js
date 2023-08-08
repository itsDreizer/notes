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

import { getFirestore, collection, getDocs, getDoc, setDoc, doc, deleteDoc } from "firebase/firestore";

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
        this.createCategories();
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

  static async addNote(title, body, category = "Без категории", date, isFavorite) {
    try {
      await setDoc(doc(collection(this.#db, this.user.uid + `-notes`)), {
        title,
        body,
        category,
        date,
        isFavorite,
      });
    } catch (e) {
      console.log("Error adding document: ", e);
    }
  }

  static async getAllNotes() {
    try {
      const result = [];
      const querySnapshot = await getDocs(collection(this.#db, this.user.uid + `-notes`));
      querySnapshot.forEach((note) => {
        const noteObject = { id: note.id, ...note.data() };
        result.push(noteObject);
      });
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  static async getNote(id) {
    try {
      const querySnapshot = await getDoc(doc(collection(this.#db, this.user.uid + `-notes`), id));
      return querySnapshot.data();
    } catch (e) {
      console.log(e);
    }
  }

  static async updateNote(title, body, category = "Без категории", date, isFavorite, id) {
    try {
      await setDoc(doc(collection(this.#db, this.user.uid + `-notes`), id), {
        title,
        body,
        category,
        date,
        isFavorite,
      });
    } catch (e) {
      console.log("Error adding document: ", e);
    }
  }

  static async deleteNote(id) {
    try {
      await deleteDoc(doc(this.#db, this.user.uid + `-notes`, id));
    } catch (e) {
      console.log(e);
    }
  }

  static async createCategories() {
    try {
      await setDoc(doc(collection(this.#db, this.user.uid + `-categories`), "categories"), {
        categories: ["Работа", "Личное", "Путешествия"],
      });
    } catch (e) {
      console.log("Error adding document: ", e);
    }
  }

  static async getCategories() {
    try {
      let result;
      const querySnapshot = await getDocs(collection(this.#db, this.user.uid + `-categories`), "categories");
      querySnapshot.forEach((category) => {
        result = category.data();
      });
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  static async updateCategories(categories) {
    try {
      await setDoc(doc(collection(this.#db, this.user.uid + `-categories`), "categories"), {
        categories: [...categories],
      });
    } catch (e) {
      console.log("Error adding document: ", e);
    }
  }

  static async deleteCategory(categories, notes) {
    try {
      await this.updateCategories(categories);
      notes.forEach(async (note) => {
        this.deleteNote(note.id);
      });
    } catch (e) {
      console.log(e);
    }
  }
}
