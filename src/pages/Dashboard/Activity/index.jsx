import Head from '../../../components/Head';
import { FetchAllActivities } from '../../../services/fetchActivity';
import Container from '../../../style/container';
import { FetchErrorAnimation, Splash } from '../../../components/animation';
import TableData from './component/TableData';
import { Table } from '../../../components/Table';
import Button from '../../../components/Button';
import styled from 'styled-components';
import SearchBars from './component/SearchBar';
import { useState } from 'react';
import AddServiceModal from './component/AddActivity';
import { CreateActivities } from '../../../services/createActivity';
import { IoMdDownload } from 'react-icons/io';
import Tips from '../../../components/Tips';
import { GenerateAttendance } from '../../../services/generateAttendance';
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
    },
    controls: {
      serviceName: '',
      date: '',
    },
    activityId: '',
  });
  const { data, isError, isFetching, refetch, error } = FetchAllActivities(
    state.query
  );
  const { mutate, isLoading } = CreateActivities({
    refetch,
    close: () => setState((p) => ({ ...p, open: false })),
    reset: () => setState((p) => ({ ...p, controls: { serviceName: '' } })),
  });
  const DATA = TableData({ data });

  const { mutate: DownloadMutate, isLoading: generateLoading } =
    GenerateAttendance();
  const handleInput = (e, d, n) => {
    setState((p) => ({
      ...p,
      controls: {
        ...p.controls,
        [n]: e,
      },
    }));
  };

  const handleCreateService = () => {
    const data = {
      serviceName: state.controls.serviceName,
      date: state.controls.date,
    };

    mutate(data);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'sn',
    },
    {
      title: 'Service Name',
      dataIndex: 'serviceName',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
    },
    {
      title: 'Created Time',
      dataIndex: 'createdAt',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        return (
          <Tips title={'Download report'} color={'green'}>
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => {
                const data = {
                  activityId: record.key,
                };
                DownloadMutate(data);
              }}
            >
              <IoMdDownload size={20} />
            </span>
          </Tips>
        );
      },
    },
  ];

  if (isFetching || isLoading || generateLoading) {
    return <Splash />;
  }

  if (isError) {
    return <FetchErrorAnimation refetch={refetch} error={error} />;
  }

  return (
    <Container>
      <AddServiceModal
        state={state}
        setState={setState}
        handleInput={handleInput}
        handleSubmit={handleCreateService}
        isLoading={isLoading}
      />
      <Head text={'RPP Church Portal'} />
      <Wrapper>
        <div className='new-post'>
          <Button
            text='New Service'
            color={'white'}
            radius={'4px'}
            disable={isFetching}
            onClick={() =>
              setState((p) => ({
                ...p,
                open: true,
                controls: {
                  ...p.controls,
                  date: new Date().toDateString(),
                },
              }))
            }
          />
        </div>
        <SearchBars refetch={refetch} state={state} setState={setState} />
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
