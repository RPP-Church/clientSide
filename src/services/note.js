import { useMutation } from '@tanstack/react-query';
import useAxiosPrivate from './usePrivate';
import { ErrorHandler } from '../components/ErrorHandler';
import { Notification } from '../components/Notification';

export const FetchNote = (setState) => {
  const axios = useAxiosPrivate();

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async (Id) => {
      const { data } = await axios.get(`/note/${Id}`);
      return { data };
    },
    onSuccess: ({ data }) => {
      setState((p) => ({
        ...p,
        showNote: false,
        edit: '',
        controls: {
          ...p.controls,
          notes: data.data?.notes,
          comment: '',
          noteId: '',
        },
      }));
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

export const SaveNote = (fetchNote) => {
  const axios = useAxiosPrivate();

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async (formdata) => {
      return await axios.post(`/note`, formdata);
    },
    onSuccess: () => {
      Notification({ type: 'success', message: 'Note saved' });
      fetchNote();
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

export const DeleteNote = (fetchNote) => {
  const axios = useAxiosPrivate();

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async ({ notedId, memberId }) => {
      const { data } = await axios.delete(`/note/${notedId}/${memberId}`);
      return { data };
    },
    onSuccess: () => {
      Notification({ type: 'success', message: 'Note removed' });
      fetchNote();
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

export const UpdateNote = (fetchNote) => {
  const axios = useAxiosPrivate();

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async ({ memberId, formdata }) => {
      return await axios.put(`/note/${memberId}`, formdata);
    },
    onSuccess: () => {
      Notification({ type: 'success', message: 'Note saved' });
      fetchNote();
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
