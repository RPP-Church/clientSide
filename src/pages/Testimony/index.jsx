import styled from 'styled-components';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import { Checkbox } from 'antd';
import DragAndDrop from './components/DragDrop';
import Button from '../../components/Button';
import { useState } from 'react';
import SliderOne from '../../assets/testimonyPic.png';
import { CreateTestimony } from '../../services/testimony';
import { Splash } from '../../components/animation';
import SuccessModal from './components/SuccessModal';

const Wrapper = styled.section`
  position: relative;
  background-color: white;

  @media screen and (min-width: 50em) {
    background: ${({ loaded, src }) =>
      loaded === 'true' ? `url(${src})` : '#333333d3'};
    height: 100%;
    background-size: cover;
    background-position: center;
    background-attachment: scroll;
  }
`;

const Header = styled.div`
  background-color: var(--primary-blue);
  color: #fff;
  height: 2.5em;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: clamp(1.1rem, 2.5vw, 1.8rem);
    margin: 0;
    font-family: var(--Inter-family);
  }

  position: sticky;
  top: 0;
  z-index: 9999;
`;

const Container = styled.div`
  padding: 2em;
  label {
    margin: 0;
    font-family: var(--Inter-family);
    font-size: clamp(0.7rem, 2.5vw, 0.9rem);
    font-weight: 400;
  }

  .ant-upload-list-item-name,
  .anticon-paper-clip {
    color: black !important;
  }

  svg {
    color: #848484 !important;
  }

  .ant-upload-drag {
    border: 1px solid #848484 !important;
    border-radius: 1px !important;
    padding: 10px !important;
    background: white !important;
    font-family: var(--Inter-family);
  }
  .inputContent {
    display: flex;
    gap: 1.2em;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .inputContent {
    label {
      width: clamp(5em, 2.5vw, 10em);
    }
  }

  .ant-checkbox-wrapper {
    width: unset !important;
  }

  .ant-input {
    color: var(--gray-color) !important;
    font-family: var(--Inter-family);
    font-weight: 300;
    flex: 1 !important;
  }

  @media screen and (min-width: 50em) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;

    form {
      width: 45%;
      background-color: white;
      padding: 2em 4em;
    }

    .inputContent {
      label {
        width: 10em;
      }
    }

    button {
      width: clamp(9em, 2.5vw, 12em);
    }
  }
`;
const Index = () => {
  const [state, setState] = useState({
    name: '',
    phone: '',
    testimony: '',
    media: [],
    public: true,
    rating: null,
    open: false,
  });

  //! *******************************************SUBMIT TESTIMONY******************************
  const handlesuccess = () => {
    setState((p) => ({
      ...p,
      open: true,
      name: '',
      phone: '',
      media: [],
      public: true,
      rating: null,
      testimony: '',
    }));
  };
  const { mutate, isLoading } = CreateTestimony(handlesuccess);

  //! CHECK IF IMAGE IS LOADED
  const [loaded, setLoaded] = useState(false);
  const img = new Image();
  img.src = SliderOne;
  img.onload = () => {
    setLoaded(true);
  };

  const handleForm = (e) => {
    e.preventDefault();

    const { name, phone, testimony, public: pub, media } = state;

    const data = {
      name,
      phone,
      testimony,
      public: pub,
      media,
    };

    mutate(data);
  };

  if (isLoading) {
    return <Splash />;
  }
  return (
    <Wrapper loaded={loaded.toString()} src={img.src}>
      <SuccessModal
        open={state.open}
        title={'Thank you for sharing your testimonies'}
        onCancel={() => setState((p) => ({ ...p, open: false }))}
      />
      <Header>
        <h1>Share Your Testimonies </h1>
      </Header>
      <Container>
        <form onSubmit={handleForm}>
          <div className='inputContent'>
            <label>Full Name (optional)</label>
            <Input
              size={'large'}
              height={'500px'}
              bordered={'1px solid #444444'}
              style={{
                border: '1px solid #444444',
                borderRadius: '2px',
                outline: 0,
                width: '15em',
              }}
              handleChange={(e) =>
                setState((p) => ({ ...p, name: e.target.value }))
              }
              value={state.name}
            />
          </div>
          <div className='inputContent'>
            <label>Phone No (optional)</label>
            <Input
              size={'large'}
              height={'500px'}
              bordered={'1px solid #444444'}
              style={{
                border: '1px solid #444444',
                borderRadius: '2px',
                outline: 0,
                width: '15em',
              }}
              name='phone'
              handleChange={(e) =>
                setState((p) => ({ ...p, phone: e.target.value }))
              }
              value={state.phone}
            />
          </div>
          <div className='inputContent'>
            <label>Your testimonies (required)</label>
            <TextArea
              size={'large'}
              height={'500px'}
              bordered={'1px solid #444444'}
              style={{
                border: '1px solid #444444',
                borderRadius: '2px',
                outline: 0,
              }}
              handleChange={(e) =>
                setState((p) => ({ ...p, testimony: e.target.value }))
              }
              value={state.testimony}
            />
          </div>
          <div className='inputContent'>
            <label>Make testimonies public</label>
            <div>
              <Checkbox
                checked={state.public === true}
                onChange={() =>
                  setState((p) => ({
                    ...p,
                    public: true,
                  }))
                }
              >
                Yes
              </Checkbox>
              <Checkbox
                checked={!state.public}
                onChange={() =>
                  setState((p) => ({
                    ...p,
                    public: false,
                  }))
                }
              >
                No
              </Checkbox>
            </div>
          </div>
          {/* <div className='inputContent'>
            <label>Rate your service</label>
          </div> */}
          <div className='inputContent'>
            <label>Optional Upload</label>
            <DragAndDrop setState={setState} />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '3em',
            }}
          >
            <Button
              text={'Submit'}
              //   disable={isLoading}
              background='var( --primary-green)'
              border={'none'}
              color='#fff'
              radius={'15px'}
              width={'35%'}
              height={'2.5rem'}
              hoverBackground='var( --primary-green)'
              size={'15px'}
              weight={'600'}
              //   onClick={handleRegister}
              hoverColor='#fff'
              shadow={'box-shadow: 0px 8px 24px 0px #636363'}
            />
          </div>
        </form>
      </Container>
    </Wrapper>
  );
};

export default Index;
