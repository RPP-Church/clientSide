import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './usePrivate';
import { Debounce } from '../hook/useDebounce';

export const GetMembers = (query) => {
  const axios = useAxiosPrivate();
  const params = `${`?page=${query?.page || 1}`}${
    query?.name ? `&name=${query.name}` : ''
  }${query?.lastName ? `&lastName=${query.lastName}` : ''}${
    query?.phone ? `&phone=${query.phone}` : ''
  }${query?.gender ? `&gender=${query.gender}` : ''}${
    query?.category ? `&category=${query.category}` : ''
  }${query?.membershipType ? `&membershipType=${query.membershipType}` : ''}`;

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

export const GetMemberMutat = (query) => {
  const axios = useAxiosPrivate();
  const params = `${query.firstName ? `&firstName=${query.firstName}` : ''}${
    query.lastName ? `&lastName=${query.lastName}` : ''
  }${query.phone ? `&phone=${query.phone}` : ''}${
    query.gender ? `&gender=${query.gender}` : ''
  }${query.category ? `&category=${query.category}` : ''}`;

  const [values] = Debounce(params, 2000);
  const { data, isLoading, refetch, isFetching, error, isError } = useQuery({
    queryKey: ['getMemberDepartment' + values],
    queryFn: async () => {
      const { data } = await axios.get(`/member?page=1${params}`);
      const option =
        data?.data?.length > 0
          ? data?.data.map((c) => ({
              label: `${c.firstName} ${c.lastName}`,
              key: c._id,
              value: `${c.firstName} ${c.lastName}`,
              phone: c.phone,
            }))
          : [];
      return option;
    },
    retry: false,
    enabled: values ? true : false,
  });

  return { data, isLoading, refetch, isFetching, error, isError };
};

export const GetLoginUsers = () => {
  const axios = useAxiosPrivate();

  const { data, isLoading, refetch, isFetching, error, isError } = useQuery({
    queryKey: ['getLoginUser'],
    queryFn: async () => {
      const { data } = await axios.get(`/auth/users`);

      return data;
    },
    retry: false,
    refetchOnMount: true,
  });

  return { data, isLoading, refetch, isFetching, error, isError };
};
