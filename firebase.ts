import firebase from 'firebase/app';

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDxhMggLaQEYwF8yhNcK6o-9LOCFeP4jSs',
  authDomain: 'pet-files.firebaseapp.com',
  projectId: 'pet-files',
  storageBucket: 'pet-files.appspot.com',
  messagingSenderId: '895132736631',
  appId: '1:895132736631:web:45518e861858f035547a72',
  measurementId: 'G-T9HZF1YRPK',
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
