import { Input as Inp } from 'antd';
import propTypes from 'prop-types';

const Input = ({
  handleChange,
  handleBlur,
  placeholder,
  disabled,
  defaultValue,
  size,
  status,
  bordered,
  allowClear,
  addonAfter,
  addonBefore,
  value,
  onPressEnter,
  height,
  type,
  width,
  name,
  handleFocus,
  style
}) => {
  return (
    <Inp
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      disabled={disabled}
      defaultValue={defaultValue}
      size={size}
      status={status}
      bordered={bordered}
      allowClear={allowClear}
      addonAfter={addonAfter}
      addonBefore={addonBefore}
      value={value}
      onPressEnter={onPressEnter}
      height={height}
      type={type}
      width={width}
      name={name}
      style={style}
      onFocus={handleFocus}
      
    />
  );
};

export default Input;

Input.propTypes = {
  handleChange: propTypes.func,
  handleBlur: propTypes.func,
  placeholder: propTypes.string,
  disabled: propTypes.bool,
  defaultValue: propTypes.string,
  size: propTypes.string,
  status: propTypes.string,
  bordered: propTypes.string,
  allowClear: propTypes.string,
  addonAfter: propTypes.string,
  addonBefore: propTypes.string,
  onChange: propTypes.func,
  value: propTypes.string,
  onPressEnter: propTypes.func,
  height: propTypes.string,
  type: propTypes.string,
  name: propTypes.string,
  width: propTypes.string,
  handleFocus: propTypes.func,
  style: propTypes.object
};
