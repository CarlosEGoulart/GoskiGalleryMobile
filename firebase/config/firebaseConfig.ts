import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyAVo5nkKy_A3NpgxOYpXFaM8t_SDV-4RAM",
  authDomain: "goskigallery-41453.firebaseapp.com",
  projectId: "goskigallery-41453",
  storageBucket: "goskigallery-41453.firebasestorage.app",
  messagingSenderId: "708233152295",
  appId: "1:708233152295:web:46446ac0de4763ca2d4b02",
  measurementId: "G-JJ1B84REN4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };