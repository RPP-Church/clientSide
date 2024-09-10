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
  UpdateDepartment,
} from '../../../services/createDepartment';
import { EditFilled } from '@ant-design/icons';

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
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => {
              console.log(record);
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
        );
      },
    },
  ];
  const { data, isError, isFetching, refetch, error } = FetchDepartments();
  const { mutate, isLoading } = CreateDepartment({
    refetch,
    close: () =>
      setState((p) => ({
        ...p,
        open: false,
      })),
    reset: () =>
      setState((p) => ({
        ...p,
        controls: {
          name: '',
          headOfDepartment: '',
          headOfDepartmentPhone: '',
          ministerInCharge: '',
        },
      })),
  });

  const { mutate: updateMutate, isLoading: loading } = UpdateDepartment({
    refetch,
    close: () =>
      setState((p) => ({
        ...p,
        open: false,
      })),
    reset: () =>
      setState((p) => ({
        ...p,
        method: 'post',
        controls: {
          name: '',
          headOfDepartment: '',
          headOfDepartmentPhone: '',
          ministerInCharge: '',
        },
      })),
  });
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
        isLoading={isLoading}
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
