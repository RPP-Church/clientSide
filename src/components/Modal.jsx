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
  width,
  footer,
  rootClassName,
  addClass,
  closeIcon,
  className
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
      footer={footer}
      rootClassName={
        addClass && rootClassName
      }
      style={{ backgroundColor: 'unset' }}
      closeIcon={closeIcon}
      className={className}
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
  width: propTypes.string,
  footer: propTypes.any,
  addClass: propTypes.bool,
  rootClassName: propTypes.string,
  closeIcon: propTypes.object
};
