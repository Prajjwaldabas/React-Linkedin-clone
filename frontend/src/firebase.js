import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';



const firebaseConfig = {
  apiKey: "AIzaSyCRcosBJose8vZV67_RpXeRiv-AICKP8cw",
  authDomain: "linkedin-clone-aab72.firebaseapp.com",
  projectId: "linkedin-clone-aab72",
  storageBucket: "linkedin-clone-aab72.appspot.com",
  messagingSenderId: "394996415825",
  appId: "1:394996415825:web:0a7dddc4efc08efc43e770"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

// Export your initialized Firebase app, auth, db, and storage
export { firebaseApp, auth, db, getStorage };


