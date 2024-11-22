import Slider from 'react-slick';
import SliderOne from '../../assets/Property 1=RPP Footage.png';
import SliderTwo from '../../assets/Property 1=RPP Footage 01.png';
import SliderThree from '../../assets/Property 1=RPP Footage 02.png';
import SliderFour from '../../assets/Property 1=RPP Footage 03.png';
import SliderFive from '../../assets/Property 1=RPP Footage 04.png';

//!MOBILE
import MobileOne from '../../assets/MobileLogin1.png';
import MobileTwo from '../../assets/MobileLogin2.png';
import MobileThree from '../../assets/MobileLogin3.png';
import MobileFour from '../../assets/MobileLogin4.png';
import MobileFive from '../../assets/MobileLogin5.png';

const CarouselLogin = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div
        style={{
          zIndex: 999999,
        }}
      >
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    ),
  };
  return (
    <Slider {...settings} autoplay>
      <div className='child'>
        <picture>
          <source media='(max-width: 560px)' srcSet={MobileOne} />
          <source media='(min-width: 561px)' srcSet={SliderOne} />
          <img src={SliderOne} alt='Pastor Femi' />
        </picture>
      </div>
      <div className='child'>
        <picture>
          <source media='(max-width: 560px)' srcSet={MobileTwo} />
          <source media='(min-width: 561px)' srcSet={SliderTwo} />
          <img src={SliderTwo} alt='Chior ' />
        </picture>
      </div>
      <div className='child'>
        <picture>
          <source media='(max-width: 560px)' srcSet={MobileThree} />
          <source media='(min-width: 561px)' srcSet={SliderThree} />
          <img src={SliderThree} alt='Pastor' />
        </picture>
      </div>
      <div className='child'>
        <picture>
          <source media='(max-width: 560px)' srcSet={MobileFour} />
          <source media='(min-width: 561px)' srcSet={SliderFour} />
          <img src={SliderFour} alt='choir ministering' />
        </picture>
      </div>
      <div className='child'>
        <picture>
          <source media='(max-width: 560px)' srcSet={MobileFive} />
          <source media='(min-width: 561px)' srcSet={SliderFive} />
          <img src={SliderFive} alt='Pastor' />
        </picture>
      </div>
    </Slider>
  );
};

export default CarouselLogin;
