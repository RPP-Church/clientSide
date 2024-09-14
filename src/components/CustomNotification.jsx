import { Button, notification, Space } from 'antd';

const close = (api) => {
  api.destroy();
};
const CustomNotification = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = ({
    title,
    description,
    type,
    handler,
    show,
    cancel,
  }) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button type='link' size='small' onClick={() => api.destroy()}>
          {cancel ? cancel : 'Cancel'}
        </Button>
        {!show && (
          <Button type='primary' size='small' onClick={() => handler()}>
            Capture
          </Button>
        )}
      </Space>
    );
    api.open({
      message: title || 'Notification Title',
      description: description,
      btn,
      key,
      onClose: () => close(api),
      duration: 100000,
      type,
    });
  };
  return { contextHolder, openNotification };
};
export default CustomNotification;
