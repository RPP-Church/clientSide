import { Modal as Mod } from 'antd';
import propTypes from 'prop-types';

const Modals = ({
  open,
  handleOK,
  children,
  title,
  okText,
  onCancel,
  loading,
  width
}) => {
  return (
    <Mod
      title={title}
      open={open}
      onCancel={onCancel}
      onOk={handleOK}
      okText={okText}
      confirmLoading={loading}
      width={width}
    >
      {children}
    </Mod>
  );
};

export default Modals;
Modals.propTypes = {
  open: propTypes.bool,
  handleOK: propTypes.func,
  title: propTypes.string,
  children: propTypes.any,
  okText: propTypes.string,
  onCancel: propTypes.func,
  loading: propTypes.any,
  width: propTypes.string
};
