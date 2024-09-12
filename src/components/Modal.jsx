import { Modal as Mod } from 'antd';
import propTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

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
  id,
  closeIcon
}) => {
  const { pathname } = useLocation();

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
        id && pathname === `/dashboard/member/${id}` && rootClassName
      }
      style={{ backgroundColor: 'unset' }}
      closeIcon={closeIcon}
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
  id: propTypes.string,
  rootClassName: propTypes.string,
  closeIcon: propTypes.object
};
