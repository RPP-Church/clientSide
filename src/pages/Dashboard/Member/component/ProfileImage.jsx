import { CiEdit } from 'react-icons/ci';
import Button from '../../../../components/Button';
import propTypes from 'prop-types';
import { Notification } from '../../../../components/Notification';
// import UploadImage from '../../../../components/camera/upload';
import Camera from '../../../../components/camera';
import styled from 'styled-components';
import { GrGallery } from 'react-icons/gr';
import { MdPhotoCamera, MdSaveAlt } from 'react-icons/md';
import { IoCloseSharp } from 'react-icons/io5';
import Tips from '../../../../components/Tips';
import SaveImage from './SaveImage';

const Container = styled.div`
  .picture {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;

    span {
      display: flex;
      align-items: center;
      flex-direction: column;
      cursor: pointer;

      p {
        font-size: 0.8rem;
        margin: 0;
      }
    }
  }
`;

const Imager = styled.div`
  width: 240px;
  height: 240px;
  border-radius: 7px;
  border: 1px solid #cccccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

  p {
    font-size: clamp(0.8rem, 2.5vw, 1.1rem);
  }

  span {
    position: absolute;
    right: 10px;
    top: 5px;
    cursor: pointer;
  }
  img {
    width: 80%;
    height: 80%;
  }

  @media screen and (max-width: 720px) {
    width: 180px;
    height: 180px;
    img {
      width: 70%;
      height: 70%;
    }
  }
`;

const ProfileImage = ({
  setState,
  state,
  handleUpdate,
  id,
  handleUpdateImage,
  uploading,
}) => {
  const handleClick = () => {
    setState((p) => ({ ...p, openWebcam: true }));
  };

  const handleChange = (e) => {
    setState((p) => ({
      ...p,
      memberName: e.target.value,
    }));
  };
  const checkImage = state.controls?.image;
  return (
    <div className='profileImage'>
      {checkImage && state.openSave && (
        <SaveImage
          open={state.openSave}
          memberName={state?.memberName}
          handleChange={handleChange}
          handleUpdateImage={handleUpdateImage}
          close={() =>
            setState((p) => ({ ...p, openSave: false, memberName: '' }))
          }
          uploading={uploading}
        />
      )}

      {state?.openWebcam && (
        <Camera
          open={state?.openWebcam}
          onCancel={() => setState((p) => ({ ...p, openWebcam: true }))}
          setState={setState}
          id={id}
        />
      )}

      {/* <div>
        <UploadImage
          onClick={handleClick}
          image={state.controls?.image}
          setState={setState}
          onUpload={handleUpdateImage}
          touched={state.touchImage}
        />
      </div> */}
      <Container>
        <Imager>
          {checkImage && (
            <span
              onClick={() =>
                setState((p) => ({
                  ...p,
                  controls: {
                    ...p.controls,
                    image: '',
                  },
                }))
              }
            >
              <Tips title={'remove image'} color={'red'}>
                <IoCloseSharp color='red' />
              </Tips>
            </span>
          )}

          {checkImage && (
            <img
              src={state.controls?.image}
              alt='image'
              style={{ objectFit: 'cover', borderRadius: '100px' }}
            />
          )}
        </Imager>

        <div className='picture'>
          <Tips title='Select image from folder' color='#32C86E'>
            <label htmlFor='select'>
              <span>
                <GrGallery size={20} color='#32C86E' />
                <input
                  type='file'
                  hidden
                  id='select'
                  onChange={(e) => {
                    const image = URL.createObjectURL(e.target.files[0]);
                    setState((p) => ({
                      ...p,
                      controls: {
                        ...p.controls,
                        image,
                      },
                      selectedimage: image,
                    }));
                  }}
                  accept='image/png, image/jpeg'
                />
              </span>
            </label>
          </Tips>
          <span>
            <Tips title='Take Photo' color='#32C86E'>
              <span onClick={() => handleClick()}>
                <MdPhotoCamera size={20} color='#32C86E' />
              </span>
            </Tips>
          </span>
          {checkImage && (
            <span>
              <span
                onClick={() =>
                  setState((p) => ({
                    ...p,
                    openSave: true,
                    memberName: p.controls.firstName + p.controls.lastName,
                  }))
                }
              >
                <Tips
                  title='Save image to gallery or upload directly'
                  color='blue'
                >
                  <MdSaveAlt size={20} color='#32C86E' />
                  {/* <span>Save Picture</span> */}
                </Tips>
              </span>
            </span>
          )}
        </div>
      </Container>
      <div className='button'>
        <button
          onClick={() =>
            setState((p) => ({
              ...p,
              update: false,
            }))
          }
        >
          Edit
          <CiEdit />
        </button>
      </div>
      <div className='updateButtons'>
        <div>
          <Button
            text={'Cancel'}
            background={'red'}
            color={'white'}
            radius={'3px'}
            padding={'10px 20px'}
            onClick={() =>
              setState((p) => ({
                ...p,
                update: true,
              }))
            }
          />
          <Button
            text='Update'
            background={'#059212'}
            radius={'3px'}
            color={'white'}
            padding={'10px 20px'}
            onClick={() => {
              if (state.update) {
                Notification({
                  type: 'warning',
                  message: 'Edit record before updating',
                });
                return;
              }
              handleUpdate();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;

ProfileImage.propTypes = {
  state: propTypes.object,
  setState: propTypes.func,
  handleUpdate: propTypes.func,
  id: propTypes.string,
  handleUpdateImage: propTypes.func,
  uploading: propTypes.bool
};
