import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth';

const config = {
  apiKey: "AIzaSyAspQLfdV7wQSGAPzGrhkR7ejVssYeWCNE",
  authDomain: "marvel-quiz-3ea7f.firebaseapp.com",
  projectId: "marvel-quiz-3ea7f",
  storageBucket: "marvel-quiz-3ea7f.appspot.com",
  messagingSenderId: "388435531885",
  appId: "1:388435531885:web:ccc5db940a9948b0aa4764",
};

const app = initializeApp(config);

export const auth = getAuth(app);