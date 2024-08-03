import { Tooltip } from 'antd';
import propTypes from 'prop-types';

const Tips = ({ children, title, color }) => {
  return (
    <Tooltip title={title} color={color}>
      {children}
    </Tooltip>
  );
};

export default Tips;

Tips.propTypes = {
  children: propTypes.object,
  title: propTypes.string,
  color: propTypes.string,
};
