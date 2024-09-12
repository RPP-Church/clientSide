import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import Modals from '../Modal';
import Button from '../Button';
import { IoCameraSharp, IoCloseCircle } from 'react-icons/io5';
import styled from 'styled-components';
import propTypes from 'prop-types';
import { MdCameraswitch } from 'react-icons/md';
import Tips from '../Tips';

const Container = styled.div`
  button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .classname .ant-modal-content {
    background-color: transparent !important;
  }

  @media screen and (max-width: 40rem) {
    button {
      width: 2.5em;
      height: 2.5em;
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    svg {
      height: 18px;
    }
  }
`;

const Camera = ({ open, onCancel, id, setState }) => {
  const webcamRef = useRef(null);
  const [mode, setModel] = useState('user');

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setState((p) => ({
      ...p,
      openWebcam: false,
      touchImage: true,
      controls: {
        ...p.controls,
        image: imageSrc,
      },
    }));
  }, [webcamRef, setState]);

  const videoConstraints = {
    facingMode: { exact: mode },
  };
  return (
    <Modals
      open={open}
      width={'50%'}
      onCancel={() => onCancel()}
      okText={'c'}
      footer={() => null}
      rootClassName='memberCamera'
      id={id}
      closeIcon={null}
    >
      <Container style={{ position: 'relative' }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat='image/jpeg'
          width={'100%'}
          videoConstraints={videoConstraints}
        />
        <div
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
          }}
        >
          <Button
            onClick={() => {
              setState((p) => ({ ...p, openWebcam: false }));
              //   webcamRef.current.stream
              //     ?.getTracks()
              //     ?.forEach((track) => track?.stop());
            }}
            background={'red'}
            color={'white'}
            radius={'50%'}
            width={'2em'}
            height={'2em'}
            padding={'3px'}
            size={'1em'}
            weight={'500'}
            shadow={'rgb(38, 57, 77) 0px 20px 30px -10px;'}
            Icon={<IoCloseCircle size={20} />}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '4%',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <Tips title={'Switch camera'}>
            <Button
              onClick={() => setModel(mode === 'user' ? 'environment' : 'user')}
              background={'white'}
              color={'black'}
              radius={'50%'}
              width={'4em'}
              height={'3em'}
              padding={'0'}
              size={'1em'}
              weight={'500'}
              Icon={<MdCameraswitch size={25} />}
              shadow={'rgb(38, 57, 77) 0px 20px 30px -10px;'}
            />
          </Tips>
          <Tips title={'Capture'}>
            <Button
              onClick={capture}
              background={'white'}
              color={'black'}
              radius={'50%'}
              width={'4em'}
              height={'3em'}
              padding={'0'}
              size={'1em'}
              weight={'500'}
              Icon={<IoCameraSharp size={25} />}
              shadow={'rgb(38, 57, 77) 0px 20px 30px -10px;'}
            />
          </Tips>
        </div>
      </Container>
    </Modals>
  );
};

export default Camera;

Camera.propTypes = {
  state: propTypes.object,
  setState: propTypes.func,
  open: propTypes.bool,
  id: propTypes.string,
  onCancel: propTypes.func,
};
