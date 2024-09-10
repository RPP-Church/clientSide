import Head from '../../../components/Head';
import { GetAllRoless } from '../../../services/getAllRoles';
import Container from '../../../style/container';
import { FetchErrorAnimation, Splash } from '../../../components/animation';
import TableData from './component/TableData';
import { Table } from '../../../components/Table';
import { IoMdClose, IoMdAdd } from 'react-icons/io';
import styled from 'styled-components';
import Tips from '../../../components/Tips';
import Button from '../../../components/Button';
import { FaUserGear } from 'react-icons/fa6';
import AddNewRole from './component/AddNewRole';
import { useState } from 'react';
import Tags from '../../../components/Tags';
import {
  AddPermissionToUser,
  CreatePermission,
  DeletePermission,
} from '../../../services/createPermission';
import AddPermission from './component/AddPermission';
const TableContainer = styled.div`
  .new-post {
    display: flex;
    justify-content: end;
    margin: 2rem 0;
  }
  .ant-tag {
    display: inline-flex !important;

    .ant-tag-close-icon {
      display: flex !important;
      align-items: center !important;
    }
  }

  .action {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .btn {
    background-color: black;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15px;
    padding: 2px;
    cursor: pointer;
  }
`;

const Index = () => {
  const [state, setState] = useState({
    open: false,
    openPermission: false,
    query: {
      name: '',
    },
    controls: {
      name: '',
      role: '',
      permissions: [],
    },
    edit: false,
  });
  //! THIS FETCH ALL ROLES
  const { data, isError, isFetching, error, refetch } = GetAllRoless();
  //! END OF FETCH ALL ROLES

  //! THIS CREATE NEW ROLE
  const { mutate, isLoading } = CreatePermission();
  //! END OF CREATE NEW ROLE

  //! DELETE A PERMISSION/UPDATE FROM AVAILABLE ROLE
  const { mutate: deleteM } = DeletePermission();
  //! END OF DELETE PERMISSION/UPDATE

  //! ADD PERMISSION TO A MEMEBER
  const { mutate: permitMutate, isLoading: loading } = AddPermissionToUser();

  const DATA = TableData({ data });

  const handleDelete = (item, key) => {
    const data = {
      permission: item,
    };
    deleteM({
      formData: data,
      id: key,
      refetch,
      method: 'post',
    });
  };

  const handleUpdate = () => {
    const data = {
      permission: {
        name: state.controls.role,
      },
    };
    deleteM({
      formData: data,
      id: state.controls?.id,
      refetch,
      method: 'put',
      close: () =>
        setState((p) => ({
          ...p,
          open: false,
          edit: false,
          controls: {
            name: '',
            role: '',
            permissions: '',
            id: '',
          },
        })),
    });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'sn',
    },
    {
      title: 'Permission Name',
      dataIndex: 'name',
    },
    {
      title: 'Permission Roles',
      dataIndex: 'roles',
      render: (_, e) => {
        return (
          <>
            {e?.roles?.length > 0
              ? e.roles?.map((doc, i) => (
                  <Tags
                    key={i}
                    onClose={() => handleDelete(doc, e.key)}
                    closeIcon={<IoMdClose size={12} />}
                  >
                    {doc.name}
                  </Tags>
                ))
              : 'No role found'}
          </>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        return (
          <div className='action'>
            <span
              className='btn'
              onClick={() =>
                setState((p) => ({
                  ...p,
                  open: true,
                  controls: {
                    ...p.controls,
                    name: record.name,
                    permissions: record.roles,
                    id: record.key,
                  },
                  edit: true,
                }))
              }
            >
              <Tips title={'Add Role'}>
                <IoMdAdd size={15} color='white' />
              </Tips>
            </span>
            <span
              className='btn '
              onClick={() =>
                setState((p) => ({
                  ...p,
                  open: false,
                  openPermission: true,
                  controls: {
                    ...p.controls,
                    name: record.name,
                    permissions: record.roles,
                    id: record.key,
                  },
                  edit: false,
                }))
              }
            >
              <Tips title={'Assign user permission'}>
                <FaUserGear size={15} color='white' />
              </Tips>
            </span>
          </div>
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
      <AddPermission
        state={state}
        setState={setState}
        mutate={permitMutate}
        isLoading={loading}
      />
      <AddNewRole
        state={state}
        setState={setState}
        refetch={refetch}
        mutate={mutate}
        isLoading={isLoading}
        handleUpdate={handleUpdate}
      />
      <Head text={'RPP Church Portal'} />
      <TableContainer>
        <div className='new-post'>
          <Button
            text='New Permission'
            color={'white'}
            radius={'4px'}
            disable={isFetching}
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
          dataSource={DATA}
          scroll={{ x: true, scrollToFirstRowOnChange: true }}
          pagination={false}
        />
      </TableContainer>
    </Container>
  );
};

export default Index;
