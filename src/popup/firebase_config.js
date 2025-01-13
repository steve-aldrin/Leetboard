import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


// config after registering firebase App 
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

// This creates firebaseApp instance
// version: SDK 9
const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp);

export{
    firebaseApp,db
}