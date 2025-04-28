import { useEffect } from 'react';
import { messaging, getToken, onMessage } from '../firebase';
import { useMessageToken } from '../context/getToken';

export const useGetPermission = () => {
  const { setToken } = useMessageToken();

  useEffect(() => {
    async function requestPermission() {
      try {
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
          const registration = await navigator.serviceWorker.ready;

          const token = await getToken(messaging, {
            vapidKey:
              'BOoxj7o_hta0JjE-Lo0HAOv1MnJ1wUUdfrxN_F7g2y49W5ADQOIL7IlOC8_B_GpEGkJ5vwrYdL66TmLjR6KowpQ',
            serviceWorkerRegistration: registration, // ✅ Force FCM to use correct registration
          });

          if (token) {
            setToken(token);
          } else {
            console.error(
              'No registration token available. Request permission to generate one.'
            );
          }
        } else {
          alert('Please enable notifications');
        }
      } catch (error) {
        console.error('An error occurred while retrieving token.', error);
      }
    }

    requestPermission();

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Message received: ', payload);
      alert(`${payload?.notification?.title}\n${payload?.notification?.body}`);
    });

    return () => {
      unsubscribe();
    };
  }, [setToken]);
};
