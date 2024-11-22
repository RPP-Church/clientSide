import Card from '../../components/Card';
import Services from '../../components/Services';
import Head from '../../components/Head';
import Container from '../../style/container';
import CarouselLogin from '../AuthLayout/CarouselLogin';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: none;
  @media screen and (max-width: 800px) {
    display: block;
    .worship {
      background-color: #dddddd;
      padding: 20px;
      h2 {
        font-size: 1.3em;
        margin-bottom: 0.6em;
      }
      p {
        font-weight: 300;
        font-size: 0.9em;
      }
      p,
      h2 {
        font-family: var(--Inter-family);
        text-align: center;
      }
    }

    .slick-dots li button:before {
      width: 30px;
      height: 30px;
      font-size: 20px;
    }
  }
`;

const Section = styled.section``;

const Home = () => {
  // const { userInfo } = useSelector((state) => state.user);
  // const { state } = useLocation();
  // const user = getToken();

  return (
    <Section>
      <Wrapper>
        <CarouselLogin />
        <div style={{ height: '2.2em' }} />
        <div className='worship'>
          <h2>Worship with us</h2>
          <p>
            In Resurrection Power Parish. We share live services every Sunday
            and special services where God Favour due
          </p>
        </div>
      </Wrapper>
    </Section>
  );
};

export default Home;
