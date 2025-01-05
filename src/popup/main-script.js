import { firebaseApp } from './firebase_config'
import {
    getAuth,
    onAuthStateChanged
} from 'firebase/auth';
// Auth instance for the current firebaseApp
const auth = getAuth(firebaseApp);

console.log("popup main!")

onAuthStateChanged(auth, user => {
    if (user != null) {
        console.log('logged in!');
        console.log("current")
        console.log(user)
    } else {
        console.log('No user');
        window.location.replace('./popup.html');
    }
});

document.querySelector('#sign_out').addEventListener('click', () => {
    auth.signOut().then(() => {
        window.location.replace('./popup.html');
    }).catch((error) => {
        console.error('Error signing out: ', error);
    });
});

