import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


// config after registering firebase App 
const config = {
    apiKey: "",

    authDomain: "",
  
    projectId: "",
  
    storageBucket: "",
  
    messagingSenderId: "",
  
    appId: "",
  
    measurementId: ""
  
};


// This creates firebaseApp instance
// version: SDK 9
const firebaseApp = initializeApp(config)
const db = getFirestore(firebaseApp);

export{
    firebaseApp,db
}