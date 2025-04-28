import { useEffect } from 'react';
import { messaging, getToken, onMessage } from '../firebase';
import { useMessageToken } from '../context/getToken';

export const useGetPermission = () => {
  const { setToken } = useMessageToken();
  useEffect(() => {
    async function requestPermission() {
      console.log('Requesting permission...');
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        console.log('Notification permission granted.');

        const token = await getToken(messaging, {
          vapidKey:
            'BOoxj7o_hta0JjE-Lo0HAOv1MnJ1wUUdfrxN_F7g2y49W5ADQOIL7IlOC8_B_GpEGkJ5vwrYdL66TmLjR6KowpQ',
        });

        setToken(token);
      } else {
        console.log('Notification permission denied.');
        alert(
          'Please enable notifications in your browser settings to receive messages.'
        );
      }
    }

    requestPermission();

    onMessage(messaging, (payload) => {
      console.log('Message received: ', payload);
      alert(payload.notification.title + '\n' + payload.notification.body);
    });
  }, []);
};
