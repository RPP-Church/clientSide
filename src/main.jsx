import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
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

const CLIENT_ID =
  '483138805363-0acd5b25u82cuq2sqvekoo268ao97oei.apps.googleusercontent.com';
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route
          path='/*'
          element={
            <GoogleOAuthProvider clientId={CLIENT_ID}>
              <App />
            </GoogleOAuthProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
