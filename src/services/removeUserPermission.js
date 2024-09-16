import { useMutation } from '@tanstack/react-query';
import useAxiosPrivate from './usePrivate';
import { ErrorHandler } from '../components/ErrorHandler';
import { Notification } from '../components/Notification';

export const RemoovePermission = ({ refetch, reset }) => {
  const axios = useAxiosPrivate();

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async ({ userId, permId }) => {
      return await axios.delete(`/auth/remove/${userId}/${permId}`);
    },
    onSuccess: (data) => {
      reset();
      Notification({ type: 'success', message: data?.message });
      refetch();
    },
    onError: (error) => {
      const message = ErrorHandler(error);

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
