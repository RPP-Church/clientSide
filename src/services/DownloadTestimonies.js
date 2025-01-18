import { useMutation } from '@tanstack/react-query';
import useAxiosPrivate from './usePrivate';
import { ErrorHandler } from '../components/ErrorHandler';
import { Notification } from '../components/Notification';

export const DownloadTestimony = () => {
  const axios = useAxiosPrivate();

  const { mutate, isLoading, data, error, isError } = useMutation({
    mutationFn: async (form) => {
      return await axios.post('/testimony/download', form, {
        responseType: 'blob',
      });
    },
    onSuccess: (data) => {
      // Create a URL for the blob
      const pdfBlob = new Blob([data.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Trigger a download
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.setAttribute('download', 'generated.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      Notification({ type: 'success', message: 'Testimoy downloaded' });
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
          message.data.msg ||
          'Failed to download pdf',
      });
    },
  });

  return { mutate, isLoading, data, error, isError };
};
