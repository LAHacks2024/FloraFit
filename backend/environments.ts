import {getAnalytics} from "firebase/analytics";
import {initializeApp} from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';


export const firebaseConfig = {
  apiKey: "AIzaSyCdFSTI1hHDkMF5ehG9Z2ODwBS0uGjCV6I",
  authDomain: "flora-fit.firebaseapp.com",
  projectId: "flora-fit",
  storageBucket: "flora-fit.appspot.com",
  messagingSenderId: "918905078493",
  appId: "1:918905078493:web:f68971affe1b5980781134",
  measurementId: "G-QPJ3BPKM8N"
};

import storage from '@react-native-firebase/storage';

export const APP = initializeApp(firebaseConfig);
export const FIRESTORE = getFirestore(APP);
export const STORAGE = getStorage(APP);
export const analytics = getAnalytics(APP);

export const AUTH = getAuth(APP);
AUTH.languageCode = 'it';
