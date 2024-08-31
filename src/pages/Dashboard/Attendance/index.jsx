import Head from '../../../components/Head';
import Container from '../../../style/container';
import { FetchErrorAnimation, Splash } from '../../../components/animation';
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
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CaptureAttendance } from '../../../services/captureAttendance';
import Tips from '../../../components/Tips';
import AddServiceModal from '../Activity/component/AddActivity';
import { CreateActivities } from '../../../services/createActivity';
import AddMemberModal from '../Member/component/AddMember';
import { MemberState } from '../Member/Logics/memberstate';
import { ErrorStatus } from '../Member/Logics/errorStatus';
import { CreateMember } from '../../../services/createMember';

const Wrapper = styled.div`
  .new-post {
    display: flex;
    justify-content: end;
    margin: 2rem 0;
    gap: 20px;
  }
`;

const Index = () => {
  const { contextHolder, openNotification } = CustomNotification();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigator = useNavigate();
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
  const { state: mState, setState: mSetState } = MemberState();

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
  const { data, refetch, isFetching, isError } = GetMembers(state.query);
  const Data = TableData({ data });
  //! END

  //! CREATE ACTIVITY
  const { mutate: createMutatate, isLoading: loadingCreate } = CreateActivities(
    {
      refetch,
      close: () => setState((p) => ({ ...p, open: false })),
      reset: () => setState((p) => ({ ...p, controls: { serviceName: '' } })),
    }
  );

  //! Submit New Member
  const { mutate: memberMutate, isLoading: mLoading } = CreateMember({
    refetch,
    close: () => mSetState((p) => ({ ...p, open: false })),
    reset: () => {
      mSetState((p) => ({
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

  const handleInput = (e, d, n) => {
    setState((p) => ({
      ...p,
      controls: {
        ...p.controls,
        [n]: e,
      },
    }));
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
                  // const options = {
                  //   day: '2-digit',
                  //   month: '2-digit',
                  //   year: 'numeric',
                  // };
                  // const formatter = new Intl.DateTimeFormat('en-GB', options);
                  // const formattedDate = formatter.format(today);
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
                  mutateActivity(today.toISOString());
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

  const handleCreateService = () => {
    const data = {
      serviceName: state.controls.serviceName,
      date: state.controls.date,
    };

    createMutatate(data);
  };

  const handleMInput = (e, d, n) => {
    if (n === 'departments') {
      mSetState((p) => ({
        ...p,
        controls: {
          ...p.controls,
          [n]: d,
        },
      }));
    } else {
      mSetState((p) => ({
        ...p,
        controls: {
          ...p.controls,
          [n]: e,
        },
      }));
    }
  };

  const handleSubmit = () => {
    const message = ErrorStatus(mState, mSetState);
    if (
      message.category ||
      message.firstName ||
      message.lastName ||
      message.gender ||
      message.membershipType
    ) {
      return;
    }
    memberMutate(mState.controls);
  };

  if (loadCapture) {
    return <Splash />;
  }

  if (isError) {
    return <FetchErrorAnimation refetch={refetch} />;
  }

  return (
    <Container>
      {contextHolder}
      <AddServiceModal
        state={state}
        setState={setState}
        handleInput={handleInput}
        handleSubmit={handleCreateService}
        isLoading={loadingCreate}
      />
      <AddMemberModal
        state={mState}
        setState={mSetState}
        handleInput={handleMInput}
        handleSubmit={handleSubmit}
        isLoading={mLoading}
      />
      <Head text={'RPP Church Portal'} />
      <Wrapper>
        <div className='new-post'>
          <Button
            text='New Member'
            color={'white'}
            radius={'4px'}
            // disable={isFetching}
            onClick={() =>
              mSetState((p) => ({
                ...p,
                open: true,
              }))
            }
          />
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
