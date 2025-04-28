// Import Firebase scripts properly
importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging-compat.js');

// Initialize Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyDskYzj7pPGXouoQyNv9IHFpXWnl8yPjvI',
  authDomain: 'resurrection-power-parish.firebaseapp.com',
  projectId: 'resurrection-power-parish',
  messagingSenderId: '581036916874',
  appId: '1:581036916874:web:e0577434ab59b47e4ead73',
});




// Initialize messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon-192.png', // Make sure you have an icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
