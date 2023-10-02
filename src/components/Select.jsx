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
}) => {
  return (
    <Sel
      width={width}
      options={options}
      placeholder={placeholder}
      onChange={(e, d) => handleChange(e, d, name)}
      onSearch={onSearch}
      name={name}
      allowClear
      value={value}
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
};
