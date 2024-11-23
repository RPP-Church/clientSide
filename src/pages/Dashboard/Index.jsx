import CarouselLogin from '../AuthLayout/CarouselLogin';
import styled from 'styled-components';
import {
  MdiTelevisionAmbientLight,
  RivetIconsUserGroup,
} from '../../components/SideBar/Icons';
import MiniLogo from '../../assets/miniLogo.png';

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
        font-size: clamp(14px, 2vw, 17px);
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
        padding: 15px;
        gap: 10px;
        .first {
          grid-column: 1/6;

          .first-head {
            display: flex;
            align-items: center;
            gap: 5px;

            p {
              font-size: clamp(6px, 2vw, 10px);
              font-weight: 500;
            }

            img {
              background-color: white;
              border-radius: 20px;
            }
          }

          p {
            font-family: var(--Inter-family);
            margin: 0;
            font-weight: 500;
            color: white;
          }

          .text {
            margin-top: 0.4em;
          }

          .text p {
            font-size: clamp(9px, 2vw, 10px);
            font-weight: 300;
            line-height: 17px;
          }
        }

        .second {
          grid-column: 6/9;

          .second-first-child {
            height: 20px;
            display: flex;
            align-items: center;
            p {
              font-size: clamp(6px, 2vw, 10px);
              font-weight: 500;
              color: white;
              font-family: var(--Inter-family);
            }
          }

          .second-address {
            margin-top: 1em;

            address {
              font-size: clamp(9px, 2vw, 10px);
              font-weight: 300;
              font-family: var(--Inter-family);
              color: white;
            }
          }
        }

        .third {
          grid-column: 9/14;

          p {
            font-size: clamp(6px, 2vw, 10px);
            font-weight: 500;
            color: white;
            font-family: var(--Inter-family);
          }
        }
      }

      @media screen and (max-width: 350px) {
        .footer-first {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .second-address {
          margin-top: 0 !important;
        }
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
            <div className='first'>
              <div className='first-head'>
                <div>
                  <img src={MiniLogo} />
                </div>
                <p>Resurrection Power Parish</p>
              </div>
              <div className='text'>
                <p>
                  In Resurrection Power Parish. We share live services every
                  Sunday and special services where God Favour due
                </p>
              </div>
            </div>
            <div className='second'>
              <div className='second-first-child'>
                <p>Official Info</p>
              </div>
              <div className='second-address'>
                <address>
                  17 Molade street off wilmer crescent, Olodi Apapa Lagos.
                </address>
              </div>
            </div>
            <div className='third'>
              <div>
                <p>Social Media</p>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </Section>
  );
};

export default Home;
