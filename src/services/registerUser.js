import { useMutation } from '@tanstack/react-query';
import useAxiosPrivate from './usePrivate';
import { ErrorHandler } from '../components/ErrorHandler';
import { Notification } from '../components/Notification';

export const RegisterUser = ({ refetch, reset }) => {
  const axios = useAxiosPrivate();

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async (form) => {
      return await axios.post('/auth/register', form);
    },
    onSuccess: (data) => {
      reset();
      Notification({ type: 'success', message: data.data?.mesage });
      refetch();
    },
    onError: (error) => {
      const message = ErrorHandler(error);

      console.log(message);
      Notification({
        type: 'error',
        message:
          message?.error ||
          message?.msg ||
          message.data.mesage ||
          message.data.msg,
      });
    },
  });

  return { mutate, isLoading, data };
};

export const RemooveP = ({ refetch, reset }) => {
  const axios = useAxiosPrivate();

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async (form) => {
      return await axios.post('/auth/register', form);
    },
    onSuccess: (data) => {
      reset();
      Notification({ type: 'success', message: data.data?.mesage });
      refetch();
    },
    onError: (error) => {
      const message = ErrorHandler(error);

      console.log(message);
      Notification({
        type: 'error',
        message:
          message?.error ||
          message?.msg ||
          message.data.mesage ||
          message.data.msg,
      });
    },
  });

  return { mutate, isLoading, data };
};
