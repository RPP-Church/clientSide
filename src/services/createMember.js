import { useMutation } from '@tanstack/react-query';
import useAxiosPrivate from './usePrivate';
import { ErrorHandler } from '../components/ErrorHandler';
import { Notification } from '../components/Notification';

export const CreateMember = ({ refetch, reset, onSuccessCreate }) => {
  const axios = useAxiosPrivate();

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async (form) => {
      return await axios.post('/member', form);
    },
    onSuccess: onSuccessCreate,
    onError: (error) => {
      const message = ErrorHandler(error);
      Notification({
        type: 'error',
        message:
          message?.error ||
          message?.mesage ||
          message?.msg ||
          message.data.mesage ||
          message.data.msg,
      });
    },
  });

  return { mutate, isLoading, data };
};

export const DeleteMember = ({ refetch, reset }) => {
  const axios = useAxiosPrivate();

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async (Id) => {
      return await axios.delete(`/member/${Id}`);
    },
    onSuccess: (data) => {
      reset();
      Notification({ type: 'success', message: data.data?.mesage });
      refetch();
    },
    onError: (error) => {
      const message = ErrorHandler(error);
      Notification({
        type: 'error',
        message:
          message?.error ||
          message?.mesage ||
          message?.msg ||
          message.data.mesage ||
          message.data.msg,
      });
    },
  });

  return { mutate, isLoading, data };
};
