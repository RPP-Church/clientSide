import Card from '../../components/Card';
import Services from '../../components/Services';
import Head from '../../components/Head';
import Container from '../../style/container';
import CarouselLogin from '../AuthLayout/CarouselLogin';
import styled from 'styled-components';
import {
  MdiTelevisionAmbientLight,
  RivetIconsUserGroup,
} from '../../components/SideBar/Icons';

const Wrapper = styled.div`
  display: none;
  @media screen and (max-width: 800px) {
    display: block;

    .mission {
      padding: 15px;

      .content {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        gap: 1em;

        .group {
          display: flex;
          align-items: center;
          gap: 30px;

          p {
            font-family: var(--Inter-family);
            font-size: 9px;
            text-align: start;
            color: var(--secondary-gray);
            text-align: end;
          }

          .group-icon {
            height: 35px;
            width: 70px;
            background: #7368a1;
            color: white;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }

    .stream {
      background-color: #d9d9d9;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px 15px;
      gap: 30px;

      .streamVideo {
        flex: 1;
        h3 {
          font-family: var(--Inter-family);
          font-size: 12px;
          margin: 0;
        }

        button {
          background-color: var(--primary-red);
          color: white;
          border: none;
          padding: 3px;
          text-transform: uppercase;
          font-family: var(--Inter-family);
          font-size: 8px;
        }
      }

      .streamText {
        flex: 2;
        p {
          margin: 0;
          color: var(--secondary-gray);
          font-size: 9px;
          text-align: start;
          font-family: var(--Inter-family);
        }
      }
    }

    .worship {
      background-color: #dddddd;
      padding: 20px;
      h2 {
        font-size: 15px;
        margin-bottom: 0.6em;
        font-weight: 500;
      }
      p {
        font-weight: 300;
        font-size: 10px;
      }
      p,
      h2 {
        font-family: var(--Inter-family);
        text-align: center;
      }
    }

    .footer {
      background-color: #232323;

      .footer-first {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
      }
    }

    .slick-dots li button:before {
      width: 30px;
      height: 30px;
      font-size: 20px;
    }

    .slick-dots {
      z-index: 1 !important;
    }

    .slick-slide img {
      display: block;
      width: 100% !important;
    }
  }
`;

const Section = styled.section`
  overflow: hidden;
`;

const Home = () => {
  // const { userInfo } = useSelector((state) => state.user);
  // const { state } = useLocation();
  // const user = getToken();

  return (
    <Section>
      <Wrapper>
        <CarouselLogin />
        <div style={{ height: '2.5em' }} />
        <div className='worship'>
          <h2>Worship with us</h2>
          <p>
            In Resurrection Power Parish. We share live services every Sunday
            and special services where God Favour due
          </p>
        </div>
        <div className='mission'>
          <div className='content'>
            <div className='group'>
              <div className='group-icon'>
                <RivetIconsUserGroup styles={{ fontSize: '2.2em' }} />
              </div>
              <p>
                To make heaven, To take as many people as possible and to
                accomplish heaven, holiness will be our lifestyle.
              </p>
            </div>

            <div className='group'>
              <div className='group-icon'>
                <MdiTelevisionAmbientLight styles={{ fontSize: '2.2em' }} />
              </div>
              <p>
                To have a member of the Redeem Christian Church of God in every
                family of all nation. To plant churches within five minutes
                walking distance in every city and town
              </p>
            </div>
          </div>
        </div>
        <div className='stream'>
          <div className='streamVideo'>
            <h3>
              Watch our streamed videos{' '}
              <span>
                {' '}
                <button>Click to watch</button>
              </span>
            </h3>
          </div>
          <div className='streamText'>
            <p>
              All our programs are streamed online on our YouTube channel.
              www.youtube.com/example. Please subscribe and click the
              notification bell so that you will be notified each time will go
              live.
            </p>
          </div>
        </div>
        <div className='footer'>
          <div className='footer-first'>
            <div>
              <p>Resurrection Power Parish</p>
            </div>
          </div>
        </div>
      </Wrapper>
    </Section>
  );
};

export default Home;
