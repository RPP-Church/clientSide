import Head from '../../../components/Head';
import Container from '../../../style/container';
import Splash from '../../../components/animation';
import Button from '../../../components/Button';
import styled from 'styled-components';
import { useState } from 'react';
import SearchBars from './component/SearchBar';
import { GetMembers } from '../../../services/getMembers';
import TableComponent from '../Member/component/TableComponent';
import TableData from '../Member/Logics/TableData';
import { UserOutlined } from '@ant-design/icons';
import { TbCaptureFilled } from 'react-icons/tb';
import {
  AutoCreateActivity,
  FetchAllActivityByDate,
} from '../../../services/fetchActivity';
import CustomNotification from '../../../components/CustomNotification';
import { Spin } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { CaptureAttendance } from '../../../services/captureAttendance';
import Tips from '../../../components/Tips';
const Wrapper = styled.div`
  .new-post {
    display: flex;
    justify-content: end;
    margin: 2rem 0;
  }
`;

const Index = () => {
  const { contextHolder, openNotification } = CustomNotification();
  const [searchParams, setSearchParams] = useSearchParams();

  const [state, setState] = useState({
    open: false,
    query: {
      size: 10,
      page: 1,
      firstName: '',
      lastName: '',
      phone: '',
      date: '',
    },
    controls: {
      serviceName: '',
      date: '',
      Id: '',
    },
  });

  const MemberId = searchParams.get('memberId');

  //! CAPTURE ATTENDANCE
  const { mutate, isLoading: loadCapture } = CaptureAttendance();
  //! END

  //! AUTO CREATE SERVICE
  const { mutate: AutoMutate, isLoading: AutoLoad } = AutoCreateActivity(
    MemberId,
    mutate
  );
  //! END

  //! FETCH ACTIVITY BY DATE
  const { mutate: mutateActivity, isLoading } = FetchAllActivityByDate(
    openNotification,
    AutoMutate,
    MemberId,
    mutate
  );
  //! END

  //! GET MEMBER"S ALSO QUERY MEMBER
  const { data, refetch, isFetching } = GetMembers(state.query);
  const Data = TableData({ data });
  //! END

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
          <div
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'initial',
              justifyContent: 'center',
            }}
          >
            <Tips title='View profile'>
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => navigator(`/dashboard/member/${record.key}`)}
              >
                <UserOutlined size={22} />
              </span>
            </Tips>
            <Tips title='Capture attendance' color='red'>
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  const today = new Date();
                  const options = {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  };
                  const formatter = new Intl.DateTimeFormat('en-GB', options);
                  const formattedDate = formatter.format(today);
                  setState((p) => ({
                    ...p,
                    controls: {
                      ...p.controls,
                      Id: record.key,
                    },
                  }));
                  setSearchParams((searchParams) => {
                    searchParams.set('memberId', record.key);
                    return searchParams;
                  });
                  mutateActivity(formattedDate);
                }}
              >
                {(isLoading && record.key === state.controls.Id) ||
                (state.controls.Id === record.key && AutoLoad) ? (
                  <Spin />
                ) : (
                  <TbCaptureFilled size={20} />
                )}
              </span>
            </Tips>
          </div>
        );
      },
    },
  ];
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

  if (loadCapture) {
    return <Splash />;
  }

  return (
    <Container>
      {contextHolder}
      {/* <AddServiceModal
        state={state}
        setState={setState}
        handleInput={handleInput}
        handleSubmit={handleCreateService}
        isLoading={isLoading}
      /> */}
      <Head text={'RPP Church Portal'} />
      <Wrapper>
        <div className='new-post'>
          <Button
            text='New Service'
            color={'white'}
            radius={'4px'}
            // disable={isFetching}
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
        <SearchBars state={state} setState={setState} refetch={refetch} />
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
