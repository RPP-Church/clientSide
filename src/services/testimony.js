import { useMutation } from '@tanstack/react-query';
import { ErrorHandler } from '../components/ErrorHandler';
import { Notification } from '../components/Notification';
import api from './api';

export const CreateTestimony = (handlesuccess) => {
  const { mutate, isLoading, data } = useMutation({
    mutationFn: async (form) => {
      return await api.post('/testimony', form);
    },
    onSuccess: () => {
      handlesuccess();
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
        placement: 'bottomLeft',
      });
    },
  });

  return { mutate, isLoading, data };
};
