import { Select as Sel } from 'antd';
import propTypes from 'prop-types';

const Select = ({
  width,
  options,
  placeholder,
  handleChange,
  onSearch,
  name,
  value,
  mode,
  status,
  handleBlur,
  handleFocus,
  style,
  disabled,
  defaultValue,
  loading,
}) => {
  return (
    <Sel
      status={status}
      width={width}
      options={options}
      placeholder={placeholder}
      onChange={(e, d) => handleChange(e, d, name)}
      onSearch={onSearch}
      name={name}
      allowClear
      value={value}
      size='large'
      mode={mode}
      onBlur={handleBlur}
      onFocus={handleFocus}
      style={style}
      disabled={disabled}
      defaultValue={defaultValue}
      showSearch
      loading={loading}
      maxTagCount={'responsive'}
    />
  );
};

export default Select;

Select.propTypes = {
  options: propTypes.any,
  handleChange: propTypes.func,
  placeholder: propTypes.string,
  width: propTypes.any,
  onSearch: propTypes.func,
  name: propTypes.string,
  value: propTypes.string,
  mode: propTypes.string,
  status: propTypes.string,
  handleBlur: propTypes.func,
  handleFocus: propTypes.func,
  style: propTypes.object,
  disabled: propTypes.bool,
  defaultValue: propTypes.any,
  loading: propTypes.bool,
};
