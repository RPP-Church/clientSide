import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyDskYzj7pPGXouoQyNv9IHFpXWnl8yPjvI',
  authDomain: 'resurrection-power-parish.firebaseapp.com',
  projectId: 'resurrection-power-parish',
  storageBucket: 'resurrection-power-parish.firebasestorage.app',
  messagingSenderId: '581036916874',
  appId: '1:581036916874:web:e0577434ab59b47e4ead73',
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
