import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './usePrivate';
import { ErrorHandler } from '../components/ErrorHandler';
import { Notification } from '../components/Notification';

export const FetchAdmin = (userId, state) => {
  const axios = useAxiosPrivate();

  const { data, isFetching, refetch, isError, error } = useQuery({
    queryKey: ['getAdmin' + userId],
    queryFn: async () => {
      const { data } = await axios.get(`/member/details/${userId}`);

      state((p) => ({
        ...p,
        controls: {
          ...p.controls,
          ...data?.data,
        },
      }));
      return data;
    },
    enabled: userId ? true : false,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  return {
    data,
    isFetching,
    refetch,
    isError,
    error,
  };
};

export const UpdateAdmin = (userId, refetch, setState) => {
  const axios = useAxiosPrivate();

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async (form) => {
      return await axios.put(`/auth/single/${userId}`, form);
    },
    onSuccess: (data) => {
      Notification({ type: 'success', message: data.data?.mesage });
      setState((p) => ({
        ...p,
        update: true,
      }));
      refetch();
    },
    onError: async (error) => {
      const message = await ErrorHandler(error);
      Notification({
        type: 'error',
        message: message.error
          ? message.error
          : message.msg
          ? message.msg
          : message.data.mesage
          ? message.data.mesage
          : message.data.msg
          ? message.data.msg
          : message.message,
      });
    },
  });

  return { mutate, isLoading, data };
};

export const UpdateAdminPassword = (userId, close) => {
  const axios = useAxiosPrivate();

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async (form) => {
      return await axios.put(`/auth/single/password/${userId}`, form);
    },
    onSuccess: (data) => {
      Notification({ type: 'success', message: data?.data?.message });
      close();
    },
    onError: (error) => {
      const message = ErrorHandler(error);
      Notification({
        type: 'error',
        message: message.error
          ? message.error
          : message.msg
          ? message.msg
          : message.data.mesage
          ? message.data.mesage
          : message.data.msg
          ? message.data.msg
          : message.message,
      });
    },
  });

  return { mutate, isLoading, data };
};
