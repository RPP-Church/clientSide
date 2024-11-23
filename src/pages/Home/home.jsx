import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//! MOBILE IMAGES
import SliderOne from '../../assets/Mobile1.png';
import SliderTwo from '../../assets/Mobile2.png';
import SliderThree from '../../assets/Mobile3.png';
import SliderFour from '../../assets/Mobile4.png';
import SliderFive from '../../assets/Mobile5.png';

//! DESKTOP IMAGES
import SliderOneD from '../../assets/Desktop1.png';
import SliderTwoD from '../../assets/Desktop2.png';
import SliderThreeD from '../../assets/Desktop3.png';
import SliderFourD from '../../assets/Desktop4.png';
import SliderFiveD from '../../assets/Desktop5.png';

import Slider from 'react-slick';
import Button from '../../components/Button';
import { Spin } from 'antd';

const Wrapper = styled.div`
  background-color: ${({ loaded }) =>
    loaded === 'true' ? `#fff` : '#333333d3'};
  height: 100%;
  background-size: cover;
  background-position: center;
  background-attachment: scroll;
  height: 100vh;

  button {
    font-weight: 600;
  }
`;

const Container = styled.div`
  overflow: hidden;
  position: relative;
  height: 100%;

  .slider-container {
    .child {
      height: 100vh;
      img {
        object-position: center;
        object-fit: cover;
        height: 100%;
      }
    }
  }

  .buttonContainers {
    position: absolute;
    z-index: 999999;
    transform: translate(0px, -30px);
    bottom: 50px;
    width: 100%;

    .content {
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: center;
      align-items: center;
      gap: 30px;
    }
  }

  button {
    font-size: clamp(0.9rem, 2.5vw, 1rem) !important;
  }
  @media screen and (min-width: 768px) {
    img {
      width: 100%;
    }

    .content {
      flex-direction: row !important;
    }

    .buttonContainers {
      transform: translate(0px, -20%) !important;
      bottom: 35% !important;
    }

    button {
      width: 12em !important;
    }
  }
`;

const Index = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const img = new Image();
  img.src = SliderOneD;
  img.onload = () => {
    setLoaded(true);
  };

  // const Navigate = () => {
  //   const link = checkDecodeToken({ user, pathname: '/login' });

  //   navigate(link);
  // };

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    nextArrow: <div />,
    prevArrow: <div />,
  };
  return (
    <Wrapper loaded={loaded.toString()} src={img.src}>
      {!loaded && (
        <div className='imageIsLoading'>
          <Spin size='large' />
        </div>
      )}
      <Container>
        <div className='slider-container'>
          <Slider {...settings} autoplay>
            <div className='child'>
              <picture>
                <source media='(max-width: 560px)' srcSet={SliderOne} />
                <source media='(min-width: 561px)' srcSet={SliderOneD} />
                <img src={SliderOneD} alt='Pastor Femi anointing a member' />
              </picture>
              {/* <img src={SliderOne} /> */}
            </div>
            <div className='child'>
              <picture>
                <source media='(max-width: 560px)' srcSet={SliderTwo} />
                <source media='(min-width: 561px)' srcSet={SliderTwoD} />
                <img src={SliderTwoD} alt='church over view' />
              </picture>
            </div>
            <div className='child'>
              <picture>
                <source media='(max-width: 560px)' srcSet={SliderThree} />
                <source media='(min-width: 561px)' srcSet={SliderThreeD} />
                <img src={SliderThreeD} alt='Over view of the church' />
              </picture>
            </div>
            <div className='child'>
              <picture>
                <source media='(max-width: 560px)' srcSet={SliderFour} />
                <source media='(min-width: 561px)' srcSet={SliderFourD} />
                <img src={SliderFourD} alt='Pastor Andrew praying' />
              </picture>
            </div>
            <div className='child'>
              <picture>
                <source media='(max-width: 560px)' srcSet={SliderFive} />
                <source media='(min-width: 561px)' srcSet={SliderFiveD} />
                <img src={SliderFiveD} alt='Church view' />
              </picture>
            </div>
          </Slider>
        </div>
        <div className='buttonContainers'>
          <div className='content'>
            <Button
              text={'Share Testimonies'}
              background={'var(--primary-blue)'}
              color='#fff'
              radius={'30px'}
              height={'3.9rem'}
              hoverBackground='var(--primary-blue)'
              hoverColor='#fff'
              size={'clamp(1.1em, 2.5vw, 1.3em)'}
              width={'70%'}
              onClick={() => navigate('/testimony')}
            />
            <Button
              text={'View Sermons'}
              background={'var(--primary-red)'}
              color='#f1efef'
              radius={'30px'}
              height={'3.9rem'}
              hoverBackground='var(--primary-red)'
              hoverColor='#fff'
              size={'clamp(1.1em, 2.5vw, 1.3em)'}
              width={'70%'}
            />
            <Button
              text={'Watch us Live'}
              background={'var(--primary-green)'}
              color='#f1efef'
              radius={'30px'}
              height={'3.9rem'}
              hoverColor='#fff'
              size={'clamp(1.1em, 2.5vw, 1.3em)'}
              width={'70%'}
            />
          </div>
        </div>
        {/* <div>
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
        </div> */}
      </Container>
    </Wrapper>
  );
};

export default Index;
