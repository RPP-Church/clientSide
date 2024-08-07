import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './usePrivate';
import { Debounce } from '../hook/useDebounce';
export const GetMembers = (query) => {
  const axios = useAxiosPrivate();
  const params = `${`?page=${query.page || 1}`}${
    query.firstName ? `&firstName=${query.firstName}` : ''
  }${query.lastName ? `&lastName=${query.lastName}` : ''}${
    query.phone ? `&phone=${query.phone}` : ''
  }${query.gender ? `&gender=${query.gender}` : ''}${
    query.category ? `&category=${query.category}` : ''
  }`;

  const [values] = Debounce(params, 1500);

  const { data, isLoading, refetch, isFetching, error, isError } = useQuery({
    queryKey: ['getMember' + values],
    queryFn: async () => {
      const { data } = await axios.get(`/member${params}`);

      return data;
    },
    retry: false,
  });

  return { data, isLoading, refetch, isFetching, error, isError };
};

export const GetSingleMember = ({ id, setState }) => {
  const axios = useAxiosPrivate();

  const { data, isLoading, refetch, isFetching, error, isError } = useQuery({
    queryKey: ['getSingleMember' + id],
    queryFn: async () => {
      const { data } = await axios.get(`/member/${id}`);

      const department =
        data?.data?._id && data.data?.departments?.length > 0
          ? data.data.departments.map((item) => ({
              label: item.name,
              key: item.deptId,
              value: item.name,
              ...item,
            }))
          : [];

      setState((p) => ({
        ...p,
        controls: {
          ...data?.data,
          departments: department,
        },
      }));
      return data;
    },
    refetchOnMount: true,
    enabled: id ? true : false,
  });

  return { data, isLoading, refetch, isFetching, error, isError };
};
