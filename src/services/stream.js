import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './usePrivate';
import { ErrorHandler } from '../components/ErrorHandler';
import { Notification } from '../components/Notification';

export const GetStream = () => {
  const axios = useAxiosPrivate();

  const { data, isFetching, refetch, isError, error } = useQuery({
    queryKey: ['stream'],
    queryFn: async () => {
      const { data } = await axios.get(`/stream`);

      return data;
    },
  });

  return {
    data,
    isFetching,
    refetch,
    isError,
    error,
  };
};

export const GetAuth = () => {
  const axios = useAxiosPrivate();

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async () => {
      return await axios.get('/stream/auth');
    },
    onSuccess: (data) => {
      window.location.href = data.data;
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

export const StartStream = () => {
  const axios = useAxiosPrivate();

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async (form) => {
      return await axios.post('/stream', form);
    },
    onSuccess: (data) => {
      console.log(data.data);
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
