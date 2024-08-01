import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './usePrivate';

export const FetchDepartments = () => {
  const axios = useAxiosPrivate();
  const dpt = localStorage.getItem('departments')
    ? JSON.parse(localStorage.getItem('departments'))
    : null;
  const { data, isFetching, refetch, isError, error } = useQuery({
    queryKey: ['getAllDepartment'],
    queryFn: async () => {
      const { data } = await axios.get(`/department`);
      if (data?.data?.length > 0) {
        localStorage.setItem('departments', JSON.stringify(data.data));
      }
      return data;
    },
    enabled: dpt?.length > 0 ? false : true,
  });

  return {
    data: dpt?.length > 0 ? dpt : data,
    isFetching,
    refetch,
    isError,
    error,
  };
};
