import Head from '../../../components/Head';
import { GetMembers } from '../../../services/getMembers';
import Container from '../../../style/container';
import Button from '../../../components/Button';
import styled from 'styled-components';
import TableData from './Logics/TableData';
import AddMemberModal from './component/AddMember';
import { ErrorStatus } from './Logics/errorStatus';
import { CreateMember } from '../../../services/createMember';
import { FaUserEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FetchErrorAnimation, Splash } from '../../../components/animation';
import SearchBars from './component/SearchBar';
import TableComponent from './component/TableComponent';
import { MemberState } from './Logics/memberstate';
import Image from './component/Image';
import QueryParameter from './component/queryParameter';
import { useLocalStorage } from '../../../hook/useLocalStorage';

const Wrapper = styled.div`
  .new-post {
    display: flex;
    justify-content: end;
    margin: 2rem 0;
  }
`;

const Index = () => {
  const navigator = useNavigate();
  const { state, setState } = MemberState();
  const { handleSearchParams } = QueryParameter();
  const [memberParams, setMemberParams] = useLocalStorage('memberParams', {});

  //! FETCH MEMEBERS
  const { data, isError, isFetching, refetch } = GetMembers(
    memberParams?.query
  );

  //! Submit New Member
  const { mutate, isLoading } = CreateMember({
    refetch,
    close: () => setState((p) => ({ ...p, open: false })),
    reset: () => {
      setState((p) => ({
        ...p,
        controls: {
          category: '',
          firstName: '',
          lastName: '',
          gender: '',
          address: '',
          phone: '',
          email: '',
          spouseName: '',
          maritalStatus: '',
          membershipType: '',
          dateOfBirth: '',
          departments: [],
          joinedDate: '',
          title: '',
        },
      }));
    },
  });
  //! END
  const Data = TableData({ data });
  const columns = [
    {
      title: 'ID',
      dataIndex: 'sn',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (_, record) => {
        return <Image src={record?.image} />;
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'FirstName',
      dataIndex: 'firstname',
    },
    {
      title: 'LastName',
      dataIndex: 'lastname',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'DOB(MM/DD)',
      dataIndex: 'dob',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        return (
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => navigator(`/dashboard/member/${record.key}`)}
          >
            <FaUserEdit size={20} />
          </span>
        );
      },
    },
  ];

  const handleInput = (e, d, n) => {
    if (n === 'departments') {
      setState((p) => ({
        ...p,
        controls: {
          ...p.controls,
          [n]: d,
        },
      }));
    } else {
      setState((p) => ({
        ...p,
        controls: {
          ...p.controls,
          [n]: e,
        },
      }));
    }
  };

  const handleSubmit = () => {
    const message = ErrorStatus(state, setState);
    if (
      message.category ||
      message.firstName ||
      message.lastName ||
      message.gender ||
      message.membershipType
    ) {
      return;
    }
    mutate(state.controls);
  };

  const handlePagination = (pageNumber, limit) => {
    setMemberParams((p) => ({
      ...p,
      query: {
        ...p.query,
        page: pageNumber,
        limit,
      },
    }));

    handleSearchParams('page', pageNumber);
  };

  if (isError) {
    return <FetchErrorAnimation refetch={refetch} />;
  }

  if (isFetching) {
    return <Splash />;
  }

  // name,
  //   gender,
  //   address,
  //   department,
  //   fromDate,
  //   toDate,
  //   membershipType,
  //   maritalStatus,
  //   sort,
  //   dob,
  //   phone,
  //   category,

  return (
    <Container>
      <AddMemberModal
        state={state}
        setState={setState}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
      <Head text={'RPP Church Portal'} />
      <Wrapper>
        <div className='new-post'>
          <Button
            text='New Member'
            color={'white'}
            radius={'4px'}
            onClick={() =>
              setState((p) => ({
                ...p,
                open: true,
              }))
            }
            disable={isFetching}
          />
        </div>
        <SearchBars
          setState={setState}
          state={state}
          refetch={refetch}
          setMemberParams={setMemberParams}
          handleSearchParams={handleSearchParams}
          memberParams={memberParams}
        />
        <div style={{ margin: '10px 0' }}>
          <h3>Total Result : {data?.totalElement ? data?.totalElement : ''}</h3>
        </div>
        <TableComponent
          isFetching={isFetching}
          Data={Data}
          columns={columns}
          handlePagination={handlePagination}
          current={data?.current + 1}
          total={data?.totalElement}
        />
      </Wrapper>
    </Container>
  );
};

export default Index;
