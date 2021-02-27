import firebase from 'firebase';

var configDev = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "loquei.firebaseapp.com",
    databaseURL: "https://loquei.firebaseio.com",
    projectId: "loquei",
    storageBucket: "loquei.appspot.com",
    messagingSenderId: process.env.REACT_APP_MSG_ID,
    appId: process.env.REACT_APP_ID,
    measurementId: "G-57G88PQ3C4"
};

//const config = process.env.NODE_ENV === 'production' ? configProd : configDev;
const config = configDev;
// Initialize Firebase

export const firebaseConfig = firebase.initializeApp(config);
export const firebaseAnalytics = firebase.analytics();
export const firebaseDatabase = firebase.database();
export const firebaseAuth = firebase.auth();