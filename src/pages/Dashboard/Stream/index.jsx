import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';
import Container from '../../../style/container';
import Head from '../../../components/Head';
import { GetStream, StartStream } from '../../../services/stream';
import { FetchErrorAnimation, Splash } from '../../../components/animation';
import { Notification } from '../../../components/Notification';

const Index = () => {
  const [videoId] = useState('i0VhNNHr9Gs');

  const { data, isError, isFetching, error, refetch } = GetStream();
  const { mutate, data: response } = StartStream();

  console.log(data?.videoId, response?.data?.broadcastId);

  const opts = {
    height: '590',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const validateToken = async (accessToken) => {
    try {
      const response = await axios.get(
        `https://oauth2.googleapis.com/tokeninfo?access_token=${accessToken}`
      );
      return { valid: true, details: response.data };
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return { valid: false, message: 'Invalid or expired token' };
      } else {
        return {
          valid: false,
          message: 'An error occurred while validating the token',
        };
      }
    }
  };

  const handleLogin = async () => {
    const CLIENT_ID = import.meta.env.VITE_APP_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_APP_REDIRECT_URI;

    const token = sessionStorage.getItem('google_access_token');

    if (token) {
      const result = await validateToken(token);
      if (result.valid) {
        const data = {
          title: 'Node api start stream',
          description: 'This is a backend test',
          access_token: token,
          scheduledStartTime: '2024-11-19T09:45:52.288Z',
        };
        mutate(data);
      } else {
        sessionStorage.removeItem('google_access_token');
        Notification({
          type: 'error',
          message: 'Please sign in with google to start stream',
        });
      }

      return;
    }

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=https://www.googleapis.com/auth/youtube`;

    window.location.href = authUrl;
  };

  useEffect(() => {
    const extractTokenFromUrl = () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');

      if (accessToken) {
        sessionStorage.setItem('google_access_token', accessToken);
        const data = {
          title: 'test',
          description: 'test',
          access_token: accessToken,
        };
        mutate(data);
      } else {
        console.log('No access token found');
      }
    };

    extractTokenFromUrl();
  }, []);

  if (isFetching) {
    return <Splash />;
  }

  if (isError) {
    return <FetchErrorAnimation refetch={refetch} error={error} />;
  }

  return (
    <Container>
      <Head text={'RPP Church Portal'} />
      <h1>Live Stream.... This is a test</h1>
      <button onClick={() => handleLogin()}>Start Stream</button>
      {data?.videoId ? (
        <YouTube videoId={data?.videoId} opts={opts} />
      ) : (
        <p>No live stream available</p>
      )}
    </Container>
  );
};

export default Index;
