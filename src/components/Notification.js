import { notification } from 'antd';

export const Notification = ({
  type,
  message,
  description,
  duration,
  placement,
}) =>
  notification[type]({
    message: message,
    description: description,
    duration: duration ? duration : 2.5,
    className: 'custom-class',
    placement: placement ? placement : 'topLeft',
  });
