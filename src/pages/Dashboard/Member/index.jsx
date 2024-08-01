import { Table } from 'antd';
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
import { Pager } from '../../../components/Pagination';

const Wrapper = styled.div`
  .new-post {
    display: flex;
    justify-content: end;
    margin: 2rem 0;
  }
`;

const Index = () => {
  const [state, setState] = useState({
    open: false,
    query: {
      size: 10,
      page: 1,
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
      // render: (_, record) =>
      //   dataSource.length >= 1 ? (
      //     <Popconfirm
      //       title='Sure to delete?'
      //       onConfirm={() => mutateDelete(record)}
      //     >
      //       <DeleteOutlined size={20} />
      //     </Popconfirm>
      //   ) : null,
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
      },
    }));
  };

  console.log(data);

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
          />
        </div>
        <Table
          size='small'
          loading={isFetching}
          columns={columns}
          dataSource={Data}
          scroll={{ x: true, scrollToFirstRowOnChange: true }}
          pagination={false}
        />
        <div
          style={{ display: 'flex', justifyContent: 'end', margin: '20px 0' }}
        >
          <Pager
            onChange={handlePagination}
            current={data?.current + 1}
            pageSize={10}
            total={data?.totalElement}
          />
        </div>
      </Wrapper>
    </Container>
  );
};

export default Index;
