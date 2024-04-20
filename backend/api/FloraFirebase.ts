// Initialize Firebase
import {getAnalytics} from "firebase/analytics";
import {initializeApp} from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {firebaseConfig} from "../environments";

export const APP = initializeApp(firebaseConfig);
export const FIRESTORE = getFirestore(APP);
export const analytics = getAnalytics(APP);

export const AUTH = getAuth(APP);
AUTH.languageCode = 'it';

