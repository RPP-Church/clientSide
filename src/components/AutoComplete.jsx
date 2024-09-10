import Complete from 'antd/lib/auto-complete';
import propTypes from 'prop-types';

const AutoComplete = ({
  options,
  onChange,
  onSearch,
  onClear,
  onSelect,
  onDeselect,
  status,
  value,
}) => {
  return (
    <Complete
      style={{
        width: '100%',
      }}
      value={value}
      options={options}
      placeholder='Search by any name'
      filterOption={(inputValue, option) =>
        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
      onChange={onChange}
      onSearch={onSearch}
      onSelect={onSelect}
      onClear={onClear}
      onDeselect={onDeselect}
      status={status}
    />
  );
};

export default AutoComplete;

AutoComplete.propTypes = {
  options: propTypes.array,
  onChange: propTypes.func,
  onSearch: propTypes.func,
  onSelect: propTypes.func,
  onClear: propTypes.func,
  onDeselect: propTypes.func,
  status: propTypes.string,
  value: propTypes.string,
};
