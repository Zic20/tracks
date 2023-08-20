// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const messaging = async () => (await isSupported()) && getMessaging(app);
const VAPID_KEY = process.env.VAPID_KEY;

const subscribeToNotification = async () => {
  const msg = await messaging();
  const token = await getToken(msg, {
    vapidKey: VAPID_KEY,
  });
  if (token) {
    const data = { fcmtoken: token };
    const response = await fetch(`/api/notification/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // const responseData = await response.json();
  } else {
    console.log("no token");
  }
};

export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications.");
    return;
  }
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    subscribeToNotification();
  } else {
    console.log("Unable to get permission to notify.");
  }
}

// export { subscribeToNotification };
