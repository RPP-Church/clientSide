import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";


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

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<App />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
