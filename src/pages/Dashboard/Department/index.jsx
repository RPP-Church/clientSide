import Head from '../../../components/Head';
import Container from '../../../style/container';
import { FetchErrorAnimation, Splash } from '../../../components/animation';
import TableData from './component/TableData';
import { Table } from '../../../components/Table';
import Button from '../../../components/Button';
import styled from 'styled-components';
// import SearchBars from './component/SearchBar';
import { useState } from 'react';
import { FetchDepartments } from '../../../services/fetchDepartments';
import AddDepartmentModal from './component/AddDepartment';
import {
  CreateDepartment,
  DeleteDepartment,
  UpdateDepartment,
} from '../../../services/createDepartment';
import { EditFilled } from '@ant-design/icons';
import { AiFillDelete } from 'react-icons/ai';
import { Spin } from 'antd';

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
      serviceName: '',
      date: '',
      firstName: '',
    },
    controls: {
      name: '',
      headOfDepartment: {
        name: '',
        userId: '',
      },
      headOfDepartmentPhone: '',
      ministerInCharge: {
        name: '',
        userId: '',
      },
    },
    method: 'post',
    deptId: '',
  });

  const { data, isError, isFetching, refetch, error } = FetchDepartments();
  const { mutate, isLoading } = CreateDepartment({
    refetch,
    reset: () => handleReset(),
  });

  const { mutate: updateMutate, isLoading: loading } = UpdateDepartment({
    refetch,
    reset: () => handleReset(),
  });

  const { mutate: deleteMutate, isLoading: dLoading } = DeleteDepartment({
    refetch,
  });

  function handleReset() {
    setState((p) => ({
      ...p,
      open: false,
      method: 'post',
      controls: {
        ...p.controls,
        name: '',
        headOfDepartment: {
          name: '',
          userId: '',
        },
        headOfDepartmentPhone: '',
        ministerInCharge: {
          name: '',
          userId: '',
        },
      },
      deptId: '',
    }));
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'sn',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'HOD',
      dataIndex: 'hod',
    },
    {
      title: 'HOD Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Minister In Charge',
      dataIndex: 'ministerInCharge',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        return (
          <div
            style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'flex-start',
            }}
          >
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setState((p) => ({
                  ...p,
                  open: true,
                  method: 'PUT',
                  controls: {
                    ...p.controls,
                    name: record?.name,
                    headOfDepartment: {
                      name: record?.hod || '',
                      userId: record?.userId || '',
                    },
                    headOfDepartmentPhone: record?.phone || '',
                    ministerInCharge: {
                      name: record?.ministerInCharge || '',
                      userId: record?.ministerId || '',
                    },
                  },
                  deptId: record.key,
                }));
              }}
            >
              <EditFilled size={20} />
            </span>
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setState((p) => ({
                  ...p,
                  deptId: record.key,
                }));
                deleteDepartment(record.key);
              }}
            >
              {dLoading && state.deptId === record.key ? (
                <Spin size='default' />
              ) : (
                <AiFillDelete size={20} />
              )}
            </span>
          </div>
        );
      },
    },
  ];

  const DATA = TableData({ data });

  const handleInput = (e, d, n) => {
    setState((p) => ({
      ...p,
      controls: {
        ...p.controls,
        [n]: n === 'headOfDepartment' || n === 'ministerInCharge' ? d : e,
      },
    }));
  };

  const handleSubmit = () => {
    const data = {
      name: state.controls.name,
    };

    if (state.controls.headOfDepartmentPhone) {
      data.headOfDepartmentPhone = state.controls.headOfDepartmentPhone;
    }

    if (
      state.controls.headOfDepartment?.name &&
      state.controls.headOfDepartment?.userId
    ) {
      data.headOfDepartment = state.controls.headOfDepartment;
    }
    if (state.controls.ministerInCharge.name) {
      data.ministerInCharge = state.controls.ministerInCharge;
    }

    if (state.method === 'post') {
      mutate(data);
    } else {
      updateMutate({ form: data, Id: state.deptId });
    }
  };

  function deleteDepartment(id) {
    deleteMutate(id);
  }

  if (isFetching || isLoading) {
    return <Splash />;
  }

  if (isError) {
    return <FetchErrorAnimation refetch={refetch} error={error} />;
  }

  return (
    <Container>
      <AddDepartmentModal
        state={state}
        setState={setState}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        isLoading={isLoading || loading || dLoading}
        handleReset={handleReset}
      />
      <Head text={'RPP Church Portal'} />
      <Wrapper>
        <div className='new-post'>
          <Button
            text='New Department'
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
        {/* <SearchBars refetch={refetch} state={state} setState={setState} /> */}
        <div>
          <Table
            size='small'
            loading={isFetching}
            columns={columns}
            dataSource={DATA}
            scroll={{ x: true, scrollToFirstRowOnChange: true }}
            pagination={false}
          />
        </div>
      </Wrapper>
    </Container>
  );
};

export default Index;
