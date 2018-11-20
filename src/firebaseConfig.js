import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
    apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "romajs-meetup.firebaseapp.com",
    databaseURL: "https://romajs-meetup.firebaseio.com",
    projectId: "romajs-meetup",
    storageBucket: "romajs-meetup.appspot.com",
    messagingSenderId: "XXXXXXXXXXXX"  
};

var FbApp = firebase.initializeApp(firebaseConfig);

export default FbApp