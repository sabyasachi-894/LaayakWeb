import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    //   paste your keys here!!!
    apiKey: "AIzaSyA3rB17zIGSknkGj-9gcvVJ3DBuJjI7rrk",
    authDomain: "laayakweb.firebaseapp.com",
    projectId: "laayakweb",
    storageBucket: "laayakweb.appspot.com",
    messagingSenderId: "738695535451",
    appId: "1:738695535451:web:1e153c62de16dc03ee587e",
    measurementId: "G-4QDML5T1CD"
    //   apiKey: "",
    //   authDomain: "",
    //   databaseURL: "",
    //   projectId: "",
    //   storageBucket: "",
    //   messagingSenderId: "",
    //   appId: "",
    //   measurementId: ""
};

firebase.initializeApp(firebaseConfig);
export default firebase;
