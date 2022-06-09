// Import Firebase
import firebase from 'firebase/compat/app'
import "firebase/compat/auth"

// Configre Firebase
const app = firebase.initializeApp({
    apiKey: "AIzaSyDd8GrSCv5PeGKA7CbkBhK60EfNuP6Ezps",
    authDomain: "polygon-fps.firebaseapp.com",
    databaseURL: "https://polygon-fps-default-rtdb.firebaseio.com",
    projectId: "polygon-fps",
    storageBucket: "polygon-fps.appspot.com",
    messagingSenderId: "959905177231",
    appId: "1:959905177231:web:bee014745d3abbabc15afa",
    measurementId: "G-M3L3P0YWXZ"
})

// Initialize Firebase
export const auth = app.auth()
export default app