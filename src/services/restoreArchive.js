import { useMutation } from '@tanstack/react-query';
import useAxiosPrivate from './usePrivate';
import { ErrorHandler } from '../components/ErrorHandler';
import { Notification } from '../components/Notification';

export const RestoreArchive = (refetch) => {
  const axios = useAxiosPrivate();

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async (id) => {
      return await axios.get(`/archive/restore/${id}`);
    },
    onSuccess: (data) => {
      Notification({ type: 'success', message: data.data?.message });
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
