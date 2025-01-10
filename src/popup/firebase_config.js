import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


// config after registering firebase App 
const firebaseConfig = {
    apiKey: "AIzaSyAdAmSLA5-xTnWqJfEPtT5Be4UnKp3XMkw",
    authDomain: "leetboard-2e3cb.firebaseapp.com",
    projectId: "leetboard-2e3cb",
    storageBucket: "leetboard-2e3cb.firebasestorage.app",
    messagingSenderId: "557091161436",
    appId: "1:557091161436:web:31681aafd9aed95da86d99"
  };

// This creates firebaseApp instance
// version: SDK 9
const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp);

export{
    firebaseApp,db
}