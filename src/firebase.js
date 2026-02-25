// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCDmDsi_JMQgx_QO4p8bnvfh-vKdN4Bmk8",
  authDomain: "success-points.firebaseapp.com",
  projectId: "success-points",
  storageBucket: "success-points.firebasestorage.app",
  messagingSenderId: "51177935348",
  appId: "1:51177935348:web:33fc4a6810790a3cbd29a1",
  measurementId: "G-64DR1TSTKY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Messaging service chalu karna
export const messaging = getMessaging(app);

// Token nikalne ka special function
export const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, { 
      // YAHAN AAPKI CHABI (VAPID KEY) DAAL DI GAYI HAI 👇
      vapidKey: 'BEIRO6rVTzbuVuTpaIFbVHsDQIZOlADkdcy2n3W-kfwScV_0HbslCNnnI_3qnAhRkayYEL6ent8Gmbf3GBwBeUs' 
    });
    
    if (currentToken) {
      console.log('Push token (Digital Address) mil gaya:', currentToken);
      return currentToken;
    } else {
      console.log('Notification permission nahi mili hai.');
      return null;
    }
  } catch (err) {
    console.error('Token nikalne mein error aaya: ', err);
    return null;
  }
};
