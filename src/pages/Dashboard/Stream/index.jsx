import { useState } from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';
import Container from '../../../style/container';
import { GetStream, StartStream } from '../../../services/stream';
import { FetchErrorAnimation, Splash } from '../../../components/animation';
import { Notification } from '../../../components/Notification';
import Button from '../../../components/Button';
import styled from 'styled-components';
import NewStreamModal from './components/NewStreamModal';

const Wrapper = styled.div`
  height: 70dvh;

  .noLive {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
`;

const Index = () => {
  const [state, setState] = useState({
    open: false,
    controls: {
      title: '',
      scheduledStartTime: '',
      description: '',
      thumbnail: '',
      visibility: 'Public',
    },
  });
  const { data, isError, isFetching, error, refetch } = GetStream();

  //! ******************** SCHEDULE A STREAM WITH START DATE *****************************
  const handleSuccess = () => {
    setState({
      open: false,
      controls: {
        title: '',
        scheduledStartTime: '',
        description: '',
      },
    });
  };

  console.log(data);
  const { mutate, isLoading: loadingScheduleStream } =
    StartStream(handleSuccess);
  //! ******************** SCHEDULE A STREAM WITH START DATE *****************************

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
    // const CLIENT_ID = import.meta.env.VITE_APP_CLIENT_ID;
    // const REDIRECT_URI = import.meta.env.VITE_APP_REDIRECT_URI;

    // const token = sessionStorage.getItem('google_access_token');

    // if (token) {
    // const result = await validateToken(token);
    // if (result.valid) {
    const { title, description, scheduledStartTime, visibility, thumbnail } =
      state.controls;

    if (!title) {
      return Notification({
        type: 'warning',
        message: 'Enter stream Title',
      });
    }

    if (!scheduledStartTime) {
      return Notification({
        type: 'warning',
        message: 'Enter Schedule Date and Time',
      });
    }
    if (!description) {
      return Notification({
        type: 'warning',
        message: 'Enter stream Discription',
      });
    }
    if (!visibility) {
      return Notification({
        type: 'warning',
        message: 'Enter stream Discription',
      });
    }

    const Form = new FormData();
    Form.append('title', title);
    Form.append('description', description);
    Form.append('scheduledStartTime', scheduledStartTime);
    Form.append('visibility', visibility);
    Form.append('thumbnail', thumbnail);
    // Form.append('access_token', token);

    mutate(Form);
    // } else {
    //   sessionStorage.removeItem('google_access_token');
    //   Notification({
    //     type: 'error',
    //     message: 'Please sign in with google to start stream',
    //   });
    // }

    // return;
    // }

    // const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=https://www.googleapis.com/auth/youtube`;

    // window.location.href = authUrl;
  };

  // useEffect(() => {
  //   const extractTokenFromUrl = () => {
  //     const hashParams = new URLSearchParams(window.location.hash.substring(1));
  //     const accessToken = hashParams.get('access_token');

  //     if (accessToken) {
  //       sessionStorage.setItem('google_access_token', accessToken);
  //     } else {
  //     }
  //   };

  //   extractTokenFromUrl();
  // }, []);

  if (isFetching) {
    return <Splash />;
  }

  if (isError) {
    return <FetchErrorAnimation refetch={refetch} error={error} />;
  }

  return (
    <Container>
      <NewStreamModal
        state={state}
        setState={setState}
        handleSubmit={handleLogin}
        isLoading={loadingScheduleStream}
      />
      <Wrapper>
        <div>
          <Button
            text='Schedule Stream'
            color={'white'}
            radius={'4px'}
            onClick={() =>
              setState((p) => ({
                ...p,
                open: true,
              }))
            }
          />
        </div>
        {data?.videoId ? (
          <YouTube videoId={data?.videoId} opts={opts} />
        ) : (
          <div className='noLive'>
            <h2>No Live Stream Available</h2>
          </div>
        )}
      </Wrapper>
    </Container>
  );
};

export default Index;
