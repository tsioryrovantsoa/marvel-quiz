import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore";

//config de Firebase deduit du site web
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

//creation du app Firebase en initialisant le config
const app = initializeApp(config);

//exporter la connexion au config de Firebase
export const auth = getAuth(app);

// exporter l'access a Firestore
export const firestore = getFirestore();

// export de la getdocument user en fonction de son id
export const user = (uid) => doc(firestore,`users/${uid}`);

//ID
// setDoc(user(id));
