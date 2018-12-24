import firebase from "firebase/app";
import "firebase/firestore";

const FIREBASE_CONFIG = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
}

const dbRef = firebase.firestore();
dbRef.settings({
    timestampsInSnapshots: true
});

export const firestore = dbRef;
