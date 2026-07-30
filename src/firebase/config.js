import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 👇 Same config jo customer site me use kiya tha
const firebaseConfig = {
  apiKey: "AIzaSyAUbYxJVUXgRxiPIGQz8fLUDGuXzAFwrbI",
  authDomain: "hospital-web-5752e.firebaseapp.com",
  projectId: "hospital-web-5752e",
  storageBucket: "hospital-web-5752e.firebasestorage.app",
  messagingSenderId: "931605280076",
  appId: "1:931605280076:web:ce53cd5a6f735c8c844be9",
  measurementId: "G-ETLESVNX6B"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;