import styled from 'styled-components';
import BackgroundPicture from '../../assets/diana-vargas-ZySVEbGBNxA-unsplash.jpg';
import { useState } from 'react';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  background: ${(props) =>
    props.loaded === 'true' ? `url(${props.src})` : '#333333d3'};
  height: 100%;
  background-size: cover;
  background-position: center;
  background-attachment: scroll;
`;

const Container = styled.div`
  padding: 0 1.3rem;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: #f1efef;

  h2 {
    width: 80%;
    font-size: 1rem;
    margin: 0;
  }

  .buttonContainer {
    margin-top: 2rem;
  }
  @media screen and (min-width: 768px) {
    h2 {
      width: 50%;
      font-size: 3rem;
    }
  }
`;

const Index = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const img = new Image();
  img.src = BackgroundPicture;
  img.onload = () => {
    setLoaded(true);
  };

  const Navigate = () => {
    navigate('/admin/login');
  };
  return (
    <Wrapper loaded={loaded.toString()} src={img.src}>
      <Container>
        <div>
          <h2>Welcome to Resurrection Power Parish Youth Fellowship</h2>
          <div className='buttonContainer'>
            <Button
              text={'Login'}
              background={'transparent'}
              border={'1px solid #f1efef'}
              color='#f1efef'
              radius={'5px'}
              width={'8rem'}
              height={'2.6rem'}
              hoverBackground='#f1efef'
              hoverColor='#090808'
              size={'1rem'}
              onClick={Navigate}
            />
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

export default Index;
