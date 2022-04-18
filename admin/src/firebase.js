import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: 'netflix-30b4e.firebaseapp.com',
    projectId: 'netflix-30b4e',
    storageBucket: 'netflix-30b4e.appspot.com',
    messagingSenderId: '472506029301',
    appId: '1:472506029301:web:7f3157ad18a87a2410a1bc'
};

firebase.initializeApp(firebaseConfig);
const storage = getStorage();

export default storage;
