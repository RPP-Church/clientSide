import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './usePrivate';
import { ErrorHandler } from '../components/ErrorHandler';
import { Notification } from '../components/Notification';

export const GetAdminCallLog = () => {
  const axios = useAxiosPrivate();

  const { data, isLoading, refetch, isFetching, error, isError } = useQuery({
    queryKey: ['GetAdminCallLog'],
    queryFn: async () => {
      const { data } = await axios.get(`/calls/log`);

      return data;
    },
  });

  return { data, isLoading, refetch, isFetching, error, isError };
};

export const UpdateUserCall = (onSuccessCall) => {
  const axios = useAxiosPrivate();

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async (Id) => {
      return await axios.put(`/calls/update-call/${Id}`);
    },
    onSuccess: onSuccessCall,
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

export const RedialUserCall = (onSuccessCall) => {
  const axios = useAxiosPrivate();

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async (Id) => {
      return await axios.put(`/calls/redial-call/${Id}`);
    },
    onSuccess: onSuccessCall,
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

export const UpdateCallLog = (onSuccess) => {
  const axios = useAxiosPrivate();

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async ({ form, Id }) => {
      return await axios.put(`/calls/update-log/${Id}`, form);
    },
    onSuccess,
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
