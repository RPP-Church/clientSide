import { useEffect } from 'react';
import { messaging, getToken, onMessage } from '../firebase';

export const useGetPermission = () => {
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const currentToken = await getToken(messaging, {
          vapidKey:
            'BOoxj7o_hta0JjE-Lo0HAOv1MnJ1wUUdfrxN_F7g2y49W5ADQOIL7IlOC8_B_GpEGkJ5vwrYdL66TmLjR6KowpQ',
        });

        if (currentToken) {
          console.log('FCM Token:', currentToken);
          // Send this token to your server to save it
          //   await axios.post('/save-fcm-token', { token: currentToken });
        } else {
          console.log('No registration token available.');
        }
      } catch (error) {
        console.error('An error occurred while retrieving token.', error);
      }
    };

    requestPermission();

    onMessage(messaging, (payload) => {
      console.log('Message received: ', payload);
      alert(payload.notification.title + '\n' + payload.notification.body);
    });
  }, []);
};
