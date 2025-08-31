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

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Background message received:', payload);
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: '/icon-192.png', // Optional: ensure this path exists
  });
})
