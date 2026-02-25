// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// Aapka naya success-points wala config
const firebaseConfig = {
  apiKey: "AIzaSyCDmDsi_JMQgx_QO4p8bnvfh-vKdN4Bmk8",
  authDomain: "success-points.firebaseapp.com",
  projectId: "success-points",
  storageBucket: "success-points.firebasestorage.app",
  messagingSenderId: "51177935348",
  appId: "1:51177935348:web:33fc4a6810790a3cbd29a1"
};

// Firebase initialize karna
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Jab browser background mein ho toh message receive karna
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Background message aaya!', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/favicon.ico' // Aapke app ka chota icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

