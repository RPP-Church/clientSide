import Input from './Input';
import { Checkbox } from 'antd';
import propTypes from 'prop-types';
import { FaAsterisk } from 'react-icons/fa';

const PasswordInput = ({
  name,
  title,
  handleChange,
  value,
  show,
  handleCheck,
  status,
  handleBlur,
  handleFocus,
  isRequired,
  showCheckBox,
}) => {
  return (
    <div>
      <div>
        {title && <label>{title}</label>}
        {isRequired && (
          <span>
            <FaAsterisk size={8} color='red' />
          </span>
        )}

        <Input
          status={status}
          placeholder={'Password'}
          size={'large'}
          height={'500px'}
          bordered={'1px solid #f1efef'}
          handleChange={(e) => handleChange(e)}
          type={show ? 'text' : 'password'}
          value={value}
          name={name}
          handleBlur={handleBlur}
          handleFocus={handleFocus}
        />
      </div>
      {/* {showCheckBox && (
        <Checkbox checked={show} onChange={(e) => handleCheck(e)}>
          <p>Show Password</p>
        </Checkbox>
      )} */}
    </div>
  );
};

export default PasswordInput;

PasswordInput.propTypes = {
  name: propTypes.string,
  value: propTypes.string,
  handleChange: propTypes.func,
  handleCheck: propTypes.func,
  title: propTypes.string,
  formdata: propTypes.object,
  show: propTypes.bool,
  status: propTypes.string,
  handleFocus: propTypes.func,
  showCheckBox: propTypes.bool,
  handleBlur: propTypes.func,
  isRequired: propTypes.bool,
};
