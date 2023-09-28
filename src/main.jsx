import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './index.css'

const BaseURL = 'http://localhost:5000';


axios.defaults.baseURL = BaseURL;

axios.interceptors.request.use((req) => {
  if (localStorage.getItem('tokens')) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem('tokens')
    )}`;
  }

  return req;
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/*' element={<App />} />
    </Routes>
  </BrowserRouter>
);
