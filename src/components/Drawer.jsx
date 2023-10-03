import { Drawer as Draw } from 'antd';
import propTypes from 'prop-types';

const Drawer = ({ open, placement, onClose, child, title, width }) => {
  return (
    <Draw
      title={title}
      placement={placement}
      closable={false}
      onClose={onClose}
      open={open}
      key={placement}
      width={width}
    >
      {child}
    </Draw>
  );
};

export default Drawer;

Drawer.propTypes = {
  open: propTypes.bool,
  placement: propTypes.string,
  onClose: propTypes.func,
  child: propTypes.any,
  title: propTypes.any,
  width: propTypes.string
};
