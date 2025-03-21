import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './usePrivate';
import { Debounce } from '../hook/useDebounce';
import { ErrorHandler } from '../components/ErrorHandler';
import { Notification } from '../components/Notification';

export const FetchAllActivities = (query) => {
  const axios = useAxiosPrivate();

  const params = `${`?page=${query.page || 1}`}${
    query.serviceName ? `&serviceName=${query.serviceName}` : ''
  }${query.startDate ? `&startDate=${query.startDate}` : ''}${
    query.endDate ? `&endDate=${query.endDate}` : ''
  }`;

  const [values] = Debounce(params, 1500);

  const { data, isFetching, refetch, isError, error } = useQuery({
    queryKey: ['getAllActivities' + values],
    queryFn: async () => {
      const { data } = await axios.get(`/activities${params}`);

      return data;
    },
    retry: false,
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

export const FetchAllActivityByDate = (
  openNotification,
  AutoMutate,
  MemberId,
  captureMutate
) => {
  const axios = useAxiosPrivate();

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async (form) => {
      const data = await axios.get(`/activities?date=${form}`);

      return { data, form };
    },
    onSuccess: ({ data, form }) => {
      const service = data?.data?.data?.length > 0 ? 'found' : false;
      const serviceName = data?.data?.data[0]?.serviceName;

      const handler = () => {
        if (service === false) {
          const data = {
            date: form,
          };
          AutoMutate(data);
        } else {
          const form = {
            activityId: data?.data?.data[0]?._id,
            memberId: MemberId,
            time: new Date()?.toLocaleTimeString(),
          };
          captureMutate(form);
        }
      };
      openNotification({
        description:
          service !== false
            ? `Service found: \n
          Service Name: ${serviceName}, 
          Date: ${data?.data?.data[0]?.date}
        `
            : `No Service with date ${form}. Click continue to auto create a service or cancel`,
        type: service !== false ? 'success' : 'error',
        title: service !== false ? 'Attendance Capturing' : 'No Service found',
        handler,
      });
    },
    onError: (error) => {
      const message =
        ErrorHandler(error)?.error ||
        ErrorHandler(error)?.message ||
        ErrorHandler(error);

      openNotification({
        description: message || 'Service not found',
        type: 'error',
      });
    },
  });

  return { mutate, isLoading, data };
};

export const AutoCreateActivity = (MemberId, captureMutate) => {
  const axios = useAxiosPrivate();

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async (form) => {
      const data = await axios.post(`/activities/auto`, form);

      return data;
    },
    onSuccess: (data) => {
      const form = {
        activityId: data?.data?.data?._id,
        memberId: MemberId,
        time: new Date()?.toLocaleTimeString(),
      };
      captureMutate(form);
    },
    onError: (error) => {
      const message = ErrorHandler(error);
      Notification({
        type: 'error',
        message:
          message.error ||
          message.msg ||
          message.data.mesage ||
          message.data.msg ||
          message.data,
      });
    },
  });

  return { mutate, isLoading, data };
};
