import Input from './Input';
import propTypes from 'prop-types';
import { FaAsterisk, FaRegEyeSlash } from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';
import styled from 'styled-components';

const Container = styled.div`
  .inputContainer {
    position: relative;

    .eyes {
      position: absolute;
      right: 2px;
      top: 50%;
      transform: translate(-50%, 0);
      cursor: pointer;
    }
  }
`;

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
    <Container>
      <div>
        {title && <label>{title}</label>}
        {isRequired && (
          <span>
            <FaAsterisk size={8} color='red' />
          </span>
        )}

        <div className='inputContainer'>
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
          <div className='eyes' onClick={(e) => handleCheck(e)}>
            {show ? <FiEye size={25} /> : <FaRegEyeSlash size={25} />}
          </div>
        </div>
      </div>
    </Container>
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
