import firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
  apiKey: "AIzaSyBNW7YspplniSH2-hoH19lC3ikx3tDiSzU",
  authDomain: "un-18-c65d4.firebaseapp.com",
  projectId: "un-18-c65d4",
  storageBucket: "un-18-c65d4.appspot.com",
  messagingSenderId: "837237325246",
  appId: "1:837237325246:web:57d8aa4008849f49ff4def"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase.firestore();
