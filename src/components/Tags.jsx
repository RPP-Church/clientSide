import { Tag } from 'antd';
import propTypes from 'prop-types';

const Tags = ({ children, closeIcon, onClose }) => {
  return (
    <Tag onClose={onClose} closeIcon={closeIcon}>
      {children}
    </Tag>
  );
};

export default Tags;
Tags.propTypes = {
  children: propTypes.object,
  closeIcon: propTypes.func,
  onClose: propTypes.func,
};
