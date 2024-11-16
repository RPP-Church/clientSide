import React, { useState } from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';
import Container from '../../../style/container';
import Head from '../../../components/Head';
import { GetAuth, GetStream } from '../../../services/stream';
import { FetchErrorAnimation, Splash } from '../../../components/animation';
import { GoogleLogin } from '@react-oauth/google';

const Index = () => {
  const [videoId, setVideoId] = useState('');

  const { data, isError, isFetching, error, refetch } = GetStream();
  const { mutate } = GetAuth();

  console.log(data);

  const opts = {
    height: '590',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

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
      {videoId ? (
        <YouTube videoId={videoId} opts={opts} />
      ) : (
        // <p>No live stream available</p>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
          useOneTap
        />
      )}
    </Container>
  );
};

export default Index;
