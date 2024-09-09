import { useMutation } from '@tanstack/react-query';
import useAxiosPrivate from './usePrivate';
import { ErrorHandler } from '../components/ErrorHandler';
import { Notification } from '../components/Notification';

export const CreatePermission = () => {
  const axios = useAxiosPrivate();

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async ({ formData, refetch, setState }) => {
      const { data } = await axios.post('/role', formData);
      return { data, refetch, setState };
    },
    onSuccess: ({ data, refetch, setState }) => {
      Notification({ type: 'success', message: data.data?.mesage });
      setState((p) => ({
        ...p,
        open: false,
        controls: {
          ...p.controls,
          name: '',
          role: '',
          permissions: [],
        },
      }));
      refetch();
    },
    onError: (error) => {
      const message = ErrorHandler(error);
      Notification({
        type: 'error',
        message:
          message?.msg ||
          message?.error ||
          message.data.mesage ||
          message.data.msg,
      });
    },
  });

  return { mutate, isLoading, data };
};

export const DeletePermission = () => {
  const axios = useAxiosPrivate();

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async ({ formData, refetch, id, method, close }) => {
      const { data } = await axios[method](`/role/${id}`, formData);
      return { data, refetch, close };
    },
    onSuccess: ({ data, refetch, close }) => {
      Notification({ type: 'success', message: data?.message });
      if (close) {
        close();
      }
      refetch();
    },
    onError: (error) => {
      const message = ErrorHandler(error);
      console.log(message, 'message');
      Notification({
        type: 'error',
        message:
          message ||
          message?.msg ||
          message?.error ||
          message.data.mesage ||
          message.data.msg,
      });
    },
  });

  return { mutate, isLoading, data };
};
