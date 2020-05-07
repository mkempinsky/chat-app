import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAnnmIC_i5ccloHg5eglrLXUk04NeJbE6I',
    authDomain: 'chat-app-6c9ad.firebaseapp.com',
    databaseURL: 'https://chat-app-6c9ad.firebaseio.com',
    projectId: 'chat-app-6c9ad',
    storageBucket: 'chat-app-6c9ad.appspot.com',
    messagingSenderId: '955600294112',
    appId: '1:955600294112:web:f9e68116e880bed4bb0085',
    measurementId: 'G-3T5SNE9Z1Z',
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
//firebase.analytics();

export default firebase;
