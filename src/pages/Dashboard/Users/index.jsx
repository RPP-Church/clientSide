import { useState } from 'react';
import { FetchErrorAnimation, Splash } from '../../../components/animation';
import Button from '../../../components/Button';
import Head from '../../../components/Head';
import { Table } from '../../../components/Table';
import { GetLoginUsers } from '../../../services/getMembers';
import Container from '../../../style/container';
import AddUserModal from './component/AddUserModal';
import TableData from './component/TableData';
import { RegisterUser } from '../../../services/registerUser';
import { AiFillDelete } from 'react-icons/ai';
import Tips from '../../../components/Tips';
import { RemoovePermission } from '../../../services/removeUserPermission';
import { Spin } from 'antd';

const Index = () => {
  const [state, setState] = useState({
    open: false,
    controls: {
      phone: '',
      password: '',
      user: '',
    },
  });

  const { data, isError, isFetching, refetch, error } = GetLoginUsers();
  const { mutate, isLoading } = RegisterUser({ refetch, reset: handleReset });
  const { mutate: removePermission, isLoading: loadingPerm } =
    RemoovePermission({ refetch, reset: handleReset });
  const DATA = TableData({ data });

  function handleReset() {
    setState({
      open: false,
      query: {
        name: '',
      },
      controls: {
        phone: '',
        password: '',
        user: '',
      },
      permId: '',
      memberId: '',
    });
  }

  const handleRemove = (userId, permId) => {
    console.log(userId, permId);
    removePermission({ userId, permId });
  };

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
      title: 'MemberId',
      dataIndex: 'memberId',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
    },

    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        return (
          <>
            <Tips title='Remove auth from user'>
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  if (loadingPerm) return;
                  setState((p) => ({
                    ...p,
                    memberId: record.key,
                  }));
                  handleRemove(record.key, record?.permission?.permId);
                }}
              >
                {loadingPerm && state?.memberId === record.key ? (
                  <Spin size='default' />
                ) : (
                  <AiFillDelete size={20} />
                )}
              </span>
            </Tips>
          </>
        );
      },
    },
  ];

  if (isFetching) {
    return <Splash />;
  }

  if (isError) {
    return <FetchErrorAnimation refetch={refetch} error={error} />;
  }

  return (
    <Container>
      <AddUserModal
        setState={setState}
        state={state}
        handleReset={handleReset}
        refetch={refetch}
        mutate={mutate}
        isLoading={isFetching || isLoading}
      />
      <Head text={'RPP Church Portal'} />
      <div>
        <div
          className='new-post'
          style={{ display: 'flex', justifyContent: 'end', margin: '20px' }}
        >
          <Button
            text='New User'
            color={'white'}
            radius={'4px'}
            disable={isFetching}
            onClick={() => {
              setState((p) => ({
                ...p,
                open: true,
              }));
            }}
          />
        </div>
        <Table
          size='small'
          loading={isFetching}
          columns={columns}
          dataSource={DATA}
          scroll={{ x: true, scrollToFirstRowOnChange: true }}
          pagination={false}
        />
      </div>
    </Container>
  );
};

export default Index;
