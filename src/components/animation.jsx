import Lottie from 'lottie-react';
import Animation from '../assets/animation.json';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  z-index: 99999999;
  background-color: white;
  width: 97%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  opacity: 0.8;
  svg {
    width: 150px !important;
  }
`;

const Splash = () => {
  return (
    <Container>
      <Lottie animationData={Animation} loop={true} autoplay />
    </Container>
  );
};

export default Splash;
