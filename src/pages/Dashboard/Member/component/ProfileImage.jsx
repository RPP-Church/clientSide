import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { CiEdit } from 'react-icons/ci';
import Button from '../../../../components/Button';
import propTypes from 'prop-types';

const ProfileImage = ({ setState, state, handleUpdate }) => {
  return (
    <div className='profileImage'>
      <div>
        <Avatar
          //   style={{ backgroundColor: '#87d068' }}
          icon={<UserOutlined />}
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 120, xxl: 120 }}
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
        {!state.update && (
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
              onClick={handleUpdate}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileImage;

ProfileImage.propTypes = {
  state: propTypes.object,
  setState: propTypes.func,
  handleUpdate: propTypes.func,
};
