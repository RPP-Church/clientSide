import { Switch as Swit } from 'antd';
import propTypes from 'prop-types';

const Switch = ({ handleFormdata, formdata }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <p>Add More Filter</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '5px',
        }}
      >
        <span>Sort Table</span>
        <Swit
          defaultChecked={formdata.sort}
          onChange={(e, d) => handleFormdata(e, d, 'sort')}
          size='small'
        />
      </div>
    </div>
  );
};

export default Switch;

Switch.propTypes = {
  handleFormdata: propTypes.func,
  formdata: propTypes.object,
};
