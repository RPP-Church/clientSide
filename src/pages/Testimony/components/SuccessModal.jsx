import styled from 'styled-components';
import Modals from '../../../components/Modal';
import Success from '../../../assets/success.svg';
import Button from '../../../components/Button';

const Container = styled.div`
  background-color: white;
  height: 30em;
  max-width: 30em;
  position: relative;
  .image {
    display: flex;
    justify-content: center;
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translate(-50%, 0px);

    img {
      width: 5em;
    }
  }
  .wrapper {
    height: 65%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3em;
    padding: 20px 20px 0 20px;
    align-items: center;
    h2 {
      font-family: var(--Inter-family);
      color: var(--primary-gray);
      text-align: center;
      font-size: clamp(0.9rem, 2.5vw, 1.2rem);
    }

    p {
      font-family: var(--Inter-family);
      color: var(--primary-gray);
      font-weight: 500;
      font-size: clamp(0.8rem, 2.5vw, 1rem);
      width: 90%;
      text-align: center;
    }
  }
`;
const SuccessModal = ({ open, onCancel, title }) => {
  return (
    <Modals
      open={open}
      width={'50%'}
      onCancel={() => onCancel()}
      okText={'c'}
      footer={() => null}
      rootClassName='memberCamera'
      addClass={true}
      closeIcon={null}
      className={'success'}
    >
      <Container>
        <div className='image'>
          <img src={Success} />
        </div>
        <div className='wrapper'>
          <h2>{title}</h2>
          <p>Your testimonies serve as encouragement to others</p>
        </div>
        <div style={{ padding: '30px' }}>
          <Button
            text={'OK'}
            background='black'
            border={'none'}
            color='#fff'
            radius={'3px'}
            width={'100%'}
            height={'2.5rem'}
            hoverBackground='black'
            size={'13px'}
            weight={'600'}
            hoverColor='#fff'
            onClick={onCancel}
          />
        </div>
      </Container>
    </Modals>
  );
};

export default SuccessModal;
