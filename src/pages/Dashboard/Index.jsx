import Card from '../../components/Card';
import Services from '../../components/Services';
import Head from '../../components/Head';
import Container from '../../style/container';
import { getToken } from '../../services/getToken';
const Test = () => {
  return 'Test New';
};

const Home = () => {
  // const { userInfo } = useSelector((state) => state.user);
  // const { state } = useLocation();
  const user = getToken();
  
 
  return (
    <Container>
      etst
      {/* <Head text={'RPP Church Portal'} />
      <Card name={user?.name} />
      <Services /> */}
    </Container>
  );
};

export default Home;
