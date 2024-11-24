import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './usePrivate';
import { Debounce } from '../hook/useDebounce';

export const GetArchive = (query) => {
  const axios = useAxiosPrivate();
  const params = `${`?page=${query?.page || 1}`}${
    query?.name ? `&name=${query.name}` : ''
  }${query?.lastName ? `&lastName=${query.lastName}` : ''}${
    query?.phone ? `&phone=${query.phone}` : ''
  }${query?.gender ? `&gender=${query.gender}` : ''}${
    query?.category ? `&category=${query.category}` : ''
  }${query?.membershipType ? `&membershipType=${query.membershipType}` : ''}${
    query?.department ? `&department=${query.department}` : ''
  }`;

  const [values] = Debounce(params, 1500);

  const { data, isLoading, refetch, isFetching, error, isError } = useQuery({
    queryKey: ['archive' + values],
    queryFn: async () => {
      const { data } = await axios.get(`/archive${params}`);

      return data;
    },
    retry: false,
  });

  return { data, isLoading, refetch, isFetching, error, isError };
};
