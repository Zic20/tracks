importScripts("https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.9/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyAdeH3O02qid6WUlQWvYdp5wUQUvJUHM5Q",
  authDomain: "trackss.firebaseapp.com",
  projectId: "trackss",
  storageBucket: "trackss.appspot.com",
  messagingSenderId: "1038928658928",
  appId: "1:1038928658928:web:ea9fdbe1351b0a1bb0dd35",
  measurementId: "G-YB81D54JHX",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();