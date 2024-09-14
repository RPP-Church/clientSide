import { useMutation, useQuery } from '@tanstack/react-query';
import { ErrorHandler } from '../components/ErrorHandler';
import useAxiosPrivate from './usePrivate';
import { Notification } from '../components/Notification';
import { Debounce } from '../hook/useDebounce';

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

export const GetSingleActivity = (id, query) => {
  const axios = useAxiosPrivate();

  const params = `${`?page=${query?.page || 1}`}${
    query?.type ? `&type=${query.type}` : ''
  }`;
  const [values] = Debounce(params, 1500);

  const { data, isLoading, refetch, isFetching, error, isError } = useQuery({
    queryKey: ['getSingleActivity' + values],
    queryFn: async () => {
      const { data } = await axios.get(`/attendance/list/${id}${params}`);
      return data;
    },
    enabled: id && values?.length > 2 ? true : false,
  });

  return { data, isLoading, refetch, isFetching, error, isError };
};
