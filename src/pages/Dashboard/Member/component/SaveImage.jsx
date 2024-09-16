import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import Modals from '../../../../components/Modal';
import propTypes from 'prop-types';

const SaveImage = ({
  open,
  memberName,
  handleChange,
  handleUpdateImage,
  close,
  uploading,
}) => {
  return (
    <Modals
      open={open}
      width={'50%'}
      onCancel={() => close()}
      okText={'c'}
      footer={() => (
        <div>
          <span onClick={() => close()} style={{ cursor: 'pointer' }}>
            Close
          </span>
        </div>
      )}
      //   rootClassName='memberCamera'
      addClass={true}
      closeIcon={null}
      loading={uploading}
    >
      <div className='child'>
        <label>
          Member Name{' '}
          <span style={{ fontSize: '8px' }}>
            (This name will be used to save in your gallery)
          </span>
        </label>
        <Input
          //   status={
          //     state.focusLastName.error && state.focusLastName.focus
          //       ? 'error'
          //       : ''
          //   }
          name='lastName'
          placeholder={'Doe'}
          size={'large'}
          value={memberName?.toLowerCase() || ''}
          handleChange={(e) => handleChange(e)}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        <Button
          text={'Save to Gallery'}
          background={'red'}
          color={'white'}
          radius={'3px'}
          padding={'10px 20px'}
          onClick={() => handleUpdateImage('gallery')}
          disable={uploading}
        />
        <Button
          text={uploading ? 'Loading...' : 'Upload to Cloud'}
          background={'blue'}
          color={'white'}
          radius={'3px'}
          padding={'10px 20px'}
          onClick={() => handleUpdateImage('cloud')}
          disable={uploading}
        />
      </div>
    </Modals>
  );
};

export default SaveImage;
SaveImage.propTypes = {
  memberName: propTypes.string,
  handleChange: propTypes.func,
  open: propTypes.bool,
  close: propTypes.func,
  handleUpdateImage: propTypes.func,
  uploading: propTypes.bool,
};
