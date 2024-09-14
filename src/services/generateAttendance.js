import { useMutation } from '@tanstack/react-query';
import { ErrorHandler } from '../components/ErrorHandler';
import useAxiosPrivate from './usePrivate';
import { Notification } from '../components/Notification';

export const GenerateAttendance = () => {
  const axios = useAxiosPrivate();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (form) => {
      return await axios.post('/attendance/total', form, {
        responseType: 'blob',
      });
    },
    onSuccess: (data) => {
      var url = window.URL.createObjectURL(
        new Blob([data.data], { type: 'application/vnd.ms-excel' })
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${`report` + Date.now()}.xlsx`); //or any other extension
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
    onError: (error) => {
      const message = ErrorHandler(error);
      Notification({
        type: 'error',
        message:
          error?.response?.status === 403
            ? 'Access Denied'
            : message?.msg ||
              message?.error ||
              message.data.mesage ||
              message.data.msg,
      });
    },
  });

  return { mutate, isLoading };
};

export const GetAttendance = (openNotification) => {
  const axios = useAxiosPrivate();

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({ Id, type }) => {
      const { data } = await axios.get(`/attendance/report/${Id}/${type}`);
      return { data, type };
    },
    onSuccess: ({ data, type }) => {
      const record = data.data;
      const activity = data?.data?.activity;

      openNotification({
        show: true,
        cancel: 'Close',
        description: `Female Adult: ${record?.AdultFemale} ******
        Male Adult: ${record.AdultMale} ****** FemaleTeen: ${record?.TeenFemale} ********** MaleTeen: ${record?.TeenMale} ***** 
        Total Attendance: ${record?.total}`,
        type: 'success',
        title: `${type} Attendance Report for  ${activity?.serviceName}, ${activity?.date}`,
      });
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

  return { mutate, isLoading };
};
