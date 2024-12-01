import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './usePrivate';
import { Debounce } from '../hook/useDebounce';
import { ErrorHandler } from '../components/ErrorHandler';
import { Notification } from '../components/Notification';

export const FetchAllTestimonies = () => {
  const axios = useAxiosPrivate();

//   const params = `${`?page=${query.page || 1}`}${
//     query.serviceName ? `&serviceName=${query.serviceName}` : ''
//   }${query.startDate ? `&startDate=${query.startDate}` : ''}${
//     query.endDate ? `&endDate=${query.endDate}` : ''
//   }`;

//   const [values] = Debounce(params, 1500);

  const { data, isFetching, refetch, isError, error } = useQuery({
    queryKey: ['getAllTestimonies' ],
    queryFn: async () => {
      const { data } = await axios.get(`/testimony`);

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
