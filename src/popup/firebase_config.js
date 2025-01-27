import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// config after registering firebase App
const firebaseConfig = {
  apiKey: process.env.API_KEY_LOCAL,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

// This creates firebaseApp instance
// version: SDK 9
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { firebaseApp, db };
