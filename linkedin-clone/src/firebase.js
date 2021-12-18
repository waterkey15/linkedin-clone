import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA1S-if7b73v76Prrn7Vkoblwpf4Nzby60",
    authDomain: "linkedin-clone-7fe4e.firebaseapp.com",
    projectId: "linkedin-clone-7fe4e",
    storageBucket: "linkedin-clone-7fe4e.appspot.com",
    messagingSenderId: "899304885725",
    appId: "1:899304885725:web:c6dab95a0e06a7fe4e7a34"
  };


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage};
export default db;