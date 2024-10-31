import { useMutation } from '@tanstack/react-query';
import useAxiosPrivate from './usePrivate';
import { ErrorHandler } from '../components/ErrorHandler';
import { Notification } from '../components/Notification';

export const CreateArchive = (refetch) => {
  const axios = useAxiosPrivate();

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async (Id) => {
      return await axios.post(`/archive/${Id}`);
    },
    onSuccess: () => {
      Notification({ type: 'success', message: 'Record Archived' });
      refetch();
    },
    onError: (error) => {
      const message = ErrorHandler(error);
      Notification({
        type: 'error',
        message:
          message.error ||
          message?.msg ||
          message?.error ||
          message.data.mesage ||
          message.data.msg,
      });
    },
  });

  return { mutate, isLoading, data };
};
