import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'slick-carousel/slick/slick.css';

import 'slick-carousel/slick/slick-theme.css';
import { MessageTokenProvider } from './context/getToken.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
      cacheTime: 24 * 60 * 1000,
    },
  },
});

if (import.meta.env.MODE === 'production') {
  if ('serviceWorker' in navigator) {
    import('workbox-window').then(({ Workbox }) => {
      const wb = new Workbox('/service-worker.js');

      wb.addEventListener('waiting', () => {
        // 🔥 New service worker is waiting to activate
        if (window.confirm('New version available! Reload to update?')) {
          wb.addEventListener('controlling', () => {
            window.location.reload();
          });
          wb.messageSW({ type: 'SKIP_WAITING' });
        }
      });

      wb.register();
    });

    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log(
          'Firebase messaging service worker registered:',
          registration
        );
      })
      .catch((err) => {
        console.error(
          'Firebase messaging service worker registration failed:',
          err
        );
      });
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <MessageTokenProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </BrowserRouter>
    </MessageTokenProvider>
  </QueryClientProvider>
);
