import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../services/usePrivate';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

const Section = styled.section`
  background-color: #eee;
  height: 100vh;
`;
const MemberDetails = () => {
  const axios = useAxiosPrivate();
  const { id } = useParams();

  console.log(id);

  const { data, isLoading } = useQuery({
    queryKey: ['details', id],
    queryFn: async () => {
      const { data } = await axios.get(`/user`, {
        params: {
          userId: id,
        },
      });

      return data;
    },
    retry: false,
  });

  console.log(data, isLoading);
  return <Section>MemberDetails</Section>;
};

export default MemberDetails;
