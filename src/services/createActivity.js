import { useMutation } from '@tanstack/react-query';
import useAxiosPrivate from './usePrivate';
import { ErrorHandler } from '../components/ErrorHandler';
import { Notification } from '../components/Notification';

export const CreateActivities = ({ refetch, close, reset }) => {
  const axios = useAxiosPrivate();

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async (form) => {
      return await axios.post('/activities', form);
    },
    onSuccess: (data) => {
      reset();
      Notification({ type: 'success', message: data.data?.mesage });
      refetch();
      close();
    },
    onError: (error) => {
      const message = ErrorHandler(error);
      Notification({
        type: 'error',
        message: message?.error || message.data.mesage || message.data.msg,
      });
    },
  });

  return { mutate, isLoading, data };
};
