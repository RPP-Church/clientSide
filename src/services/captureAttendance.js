import { useMutation } from '@tanstack/react-query';
import useAxiosPrivate from './usePrivate';
import { ErrorHandler } from '../components/ErrorHandler';
import { Notification } from '../components/Notification';

export const CaptureAttendance = () => {
  const axios = useAxiosPrivate();

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async (form) => {
      return await axios.post('/attendance/auto', form);
    },
    onSuccess: (data) => {
      Notification({ type: 'success', message: data.data?.mesage });
    },
    onError: (error) => {
      const message = ErrorHandler(error);
      Notification({
        type: 'error',
        message: message.data.mesage || message.data.msg,
      });
    },
  });

  return { mutate, isLoading, data };
};
