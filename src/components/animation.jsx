import Lottie from 'lottie-react';
import Animation from '../assets/animation.json';
import styled from 'styled-components';
import ErrorAnimations from '../assets/notFound.json';
import Error from '../assets/Error.json';
import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorHandler } from './ErrorHandler';
const Container = styled.div`
  position: absolute;
  z-index: 1;
  background-color: white;
  width: 97%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  opacity: 0.8;
  flex-direction: column;

  h3 {
    margin: 0;
    font-weight: bold;
    color: red;
    font-size: clamp(1.5em, 20vh, 3em);
  }

  .secondChild {
    margin-top: 1em;
  }
  .secondChild,
  .firstChild {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    button {
      border-radius: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      padding: 4px;
      background-color: red;
      color: white;
      width: 20%;
      font-weight: 900;

      @media screen and (max-width: 40rem) {
        width: 50%;
      }
    }
  }

  svg {
    width: ${({ width }) => (width ? width : '600px')} !important;

    @media screen and (max-width: 40rem) {
      width: 200px !important;
    }
  }
`;

export const Splash = () => {
  return (
    <Container width={'200px'}>
      <Lottie animationData={Animation} loop={true} autoplay />
    </Container>
  );
};

export const ErrorAnimation = () => {
  return (
    <Container>
      <Lottie animationData={ErrorAnimations} loop={true} autoplay />
    </Container>
  );
};

export const FetchErrorAnimation = ({ refetch, error }) => {
  const message = ErrorHandler(error)?.error || ErrorHandler(error)?.message;
  const navigate = useNavigate();

  console.log(error?.response?.status);
  return (
    <Container width={'200px'}>
      <div style={{ marginBottom: '2em' }}>
        <Link
          to='#'
          onClick={() => (navigate(-1) ? navigate(-1) : navigate('/dashboard'))}
          style={{ textDecoration: 'none' }}
        >
          Go Back
        </Link>
      </div>
      <Lottie animationData={Error} loop={true} autoplay />
      <div className='firstChild'>
        <h3 className='font-Bold text-5xl text-red-500 '>Oops!</h3>
        <p className='font-Medium text-[16px] leading-6 text-center text-gray-500'>
          {message
            ? message
            : error?.response?.status === 403
            ? 'Access Denied, contact admin for access'
            : 'An error occurred'}
        </p>
      </div>
      <div className='secondChild'>
        <Button
          text={'TRY AGAIN'}
          onClick={() => {
            refetch();
          }}
          // disabled={vehicleStatus === 'pending' ? true : false}
          // loading={vehicleStatus === 'pending' ? true : false}
          childclassName={`text-white text-lg font-SemiBold`}
        />
      </div>
    </Container>
  );
};
