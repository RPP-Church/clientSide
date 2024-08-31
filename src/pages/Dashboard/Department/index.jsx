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
import { CreateDepartment } from '../../../services/createDepartment';

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
];

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
  });
  const { data, isError, isFetching, refetch } = FetchDepartments();
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
  const DATA = TableData({ data });

  const handleInput = (e, d, n) => {
    setState((p) => ({
      ...p,
      controls: {
        ...p.controls,
        [n]: n === 'headOfDepartment' ? d : e,
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

    mutate(data);
  };

  if (isFetching || isLoading) {
    return <Splash />;
  }

  if (isError) {
    return <FetchErrorAnimation refetch={refetch} />;
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
