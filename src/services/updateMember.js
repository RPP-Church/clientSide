import { useMutation } from '@tanstack/react-query';
import useAxiosPrivate from './usePrivate';
import { ErrorHandler } from '../components/ErrorHandler';
import { Notification } from '../components/Notification';

export const UpdateMember = ({ refetch, close }) => {
  const axios = useAxiosPrivate();

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async ({ data, id }) => {
      return await axios.put(`/member/${id}`, data);
    },
    onSuccess: (data) => {
      Notification({ type: 'success', message: data.data?.mesage });
      refetch();
      close();
    },
    onError: (error) => {
      const message = ErrorHandler(error);
      Notification({
        type: 'error',
        message:
          message?.error ||
          message.data.mesage ||
          message.data.msg ||
          message.data,
      });
    },
  });

  return { mutate, isLoading, data };
};
