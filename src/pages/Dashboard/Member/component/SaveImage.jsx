import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import Modals from '../../../../components/Modal';
import propTypes from 'prop-types';
import { styled } from 'styled-components';

const Container = styled.div`
  .btn-Div {
    display: flex;
    justify-content: end;
    gap: 20px;
    margin-top: 20px;
    flex-direction: column;
    button {
      border-radius: 23px !important;
    }

    @media screen and (min-width: 30rem) {
      flex-direction: row;
    }
  }
`;
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
      <Container>
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
        <div className='btn-Div'>
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
      </Container>
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
