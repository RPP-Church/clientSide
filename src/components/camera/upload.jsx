import { IoCameraSharp } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { RiUploadCloud2Fill } from 'react-icons/ri';
import styled from 'styled-components';
import Tips from '../../components/Tips';
import propTypes from 'prop-types';

const Cover = styled.div`
  width: 100%;
  color: white;
  .container {
    width: ${({ background }) => (background === 'unset' ? '205px' : '205px')};
    height: ${({ background }) => (background === 'unset' ? '200px' : '200px')};
    background-color: ${({ background }) => background} !important;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  span {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
  }

  .upload {
    position: absolute;
    bottom: 15%;
    left: 50%;
    transform: translateX(-59%);
    font-size: 1.3em;
    font-weight: 500;
    display: flex;
    gap: 20px;
  }
`;

const UploadImage = ({ onClick, image, setState, onUpload, touched }) => {
  const removeImage = () => {
    setState((p) => ({
      ...p,
      controls: {
        ...p.controls,
        image: '',
      },
    }));
  };

  return (
    <Cover background={image ? 'unset' : 'black'}>
      <div className='container'>
        {image ? (
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <img
              src={image}
              style={{ objectFit: 'cover', borderRadius: '100px' }}
              width={'95%'}
              height={'95%'}
            />
            <div className='upload'>
              <Tips title='Remove image'>
                <span onClick={removeImage}>
                  <MdDelete size={20} color='red' />
                </span>
              </Tips>

              <Tips title={!touched ? 'Take Picture' : 'Upload image'}>
                <span
                  onClick={() => {
                    if (!touched) {
                      onClick();
                      return;
                    }
                    onUpload();
                  }}
                >
                  {!touched ? (
                    <IoCameraSharp size={20} />
                  ) : (
                    <RiUploadCloud2Fill size={20} />
                  )}
                </span>
              </Tips>
            </div>
          </div>
        ) : (
          <span onClick={() => onClick()}>
            <IoCameraSharp size={20} />
            Take Picture
          </span>
        )}
      </div>
    </Cover>
  );
};

export default UploadImage;

UploadImage.propTypes = {
  state: propTypes.object,
  setState: propTypes.func,
  image: propTypes.string,
  onUpload: propTypes.func,
  onClick: propTypes.func,
};
