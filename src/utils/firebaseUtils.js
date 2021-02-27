import firebase from 'firebase';

var configDev = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "loquei.firebaseapp.com",
    databaseURL: "https://loquei.firebaseio.com",
    projectId: "loquei",
    storageBucket: "loquei.appspot.com",
    messagingSenderId: "840561221049",
    appId: "1:840561221049:web:e7a1d3eb30b2f43fcaea68",
    measurementId: "G-57G88PQ3C4"
};

//const config = process.env.NODE_ENV === 'production' ? configProd : configDev;
const config = configDev;
// Initialize Firebase

export const firebaseConfig = firebase.initializeApp(config);
export const firebaseAnalytics = firebase.analytics();
export const firebaseDatabase = firebase.database();
export const firebaseAuth = firebase.auth();