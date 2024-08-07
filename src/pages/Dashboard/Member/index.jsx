import Head from '../../../components/Head';
import { GetMembers } from '../../../services/getMembers';
import Container from '../../../style/container';
import Button from '../../../components/Button';
import styled from 'styled-components';
import TableData from './Logics/TableData';
import { useState } from 'react';
import AddMemberModal from './component/AddMember';
import { ErrorStatus } from './Logics/errorStatus';
import { CreateMember } from '../../../services/createMember';
import { FaUserEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FetchErrorAnimation, Splash } from '../../../components/animation';
import SearchBars from './component/SearchBar';
import TableComponent from './component/TableComponent';

const Wrapper = styled.div`
  .new-post {
    display: flex;
    justify-content: end;
    margin: 2rem 0;
  }
`;

const Index = () => {
  const navigator = useNavigate();
  const [state, setState] = useState({
    open: false,
    query: {
      size: 10,
      page: 1,
      firstName: '',
      lastName: '',
      phone: '',
      category: '',
      gender: '',
    },
    focusFirstName: {
      error: false,
      focus: false,
    },
    focusLastName: {
      error: false,
      focus: false,
    },
    focusCategory: {
      error: false,
      focus: false,
    },
    focusGender: {
      error: false,
      focus: false,
    },
    focusMember: {
      error: false,
      focus: false,
    },
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
  });

  //! FETCH MEMEBERS
  const { data, isError, isFetching, refetch } = GetMembers(state.query);

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
    setState((p) => ({
      ...p,
      query: {
        ...p.query,
        page: pageNumber,
        limit,
      },
    }));
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
        <SearchBars setState={setState} state={state} refetch={refetch} />
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
