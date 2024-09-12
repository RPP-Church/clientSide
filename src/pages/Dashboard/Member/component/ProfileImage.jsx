import { CiEdit } from 'react-icons/ci';
import Button from '../../../../components/Button';
import propTypes from 'prop-types';
import { Notification } from '../../../../components/Notification';
import UploadImage from '../../../../components/camera/upload';
import Camera from '../../../../components/camera';

const ProfileImage = ({
  setState,
  state,
  handleUpdate,
  id,
  handleUpdateImage,
}) => {
  const handleClick = () => {
    setState((p) => ({ ...p, openWebcam: true }));
  };
  return (
    <div className='profileImage'>
      <Camera
        open={state?.openWebcam}
        onCancel={() => setState((p) => ({ ...p, openWebcam: true }))}
        setState={setState}
        id={id}
      />
      <div>
        <UploadImage
          onClick={handleClick}
          image={state.controls?.image}
          setState={setState}
          onUpload={handleUpdateImage}
          touched={state.touchImage}
        />
      </div>
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
};
