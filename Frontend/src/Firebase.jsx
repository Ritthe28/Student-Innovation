import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7COfn2ZtGnwxoyO9rXiaRr3ntPakMCGI",
  authDomain: "student-notes-project.firebaseapp.com",
  projectId: "student-notes-project",
  storageBucket: "student-notes-project.appspot.com",
  messagingSenderId: "11594724415",
  appId: "1:11594724415:web:036ea29e3eff81a0cbb48a",
  measurementId: "G-L9VT21CEYP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firestore = getFirestore(app);

export { auth, provider, signInWithRedirect, signOut, firestore };
