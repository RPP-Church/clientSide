import Head from '../../../components/Head';
import Container from '../../../style/container';
import { FetchErrorAnimation, Splash } from '../../../components/animation';
import Button from '../../../components/Button';
import styled from 'styled-components';
import { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { CaptureAttendance } from '../../../services/captureAttendance';
import Tips from '../../../components/Tips';
import AddServiceModal from '../Activity/component/AddActivity';
import { CreateActivities } from '../../../services/createActivity';
import AddMemberModal from '../Member/component/AddMember';
import { MemberState } from '../Member/Logics/memberstate';
import { ErrorStatus } from '../Member/Logics/errorStatus';
import { CreateMember } from '../../../services/createMember';
import Image from '../Member/component/Image';
import { useLocalStorage } from '../../../hook/useLocalStorage';
import SearchBars from '../Member/component/SearchBar';
import QueryParameter from '../Member/component/queryParameter';
import { IoCameraSharp } from 'react-icons/io5';
import Camera from '../../../components/camera';
import Columns from '../Member/component/Column';

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
  const { searchParams, handleSearchParams } = QueryParameter();

  const navigator = useNavigate();
  const [state, setState] = useState({
    open: false,
    openWebcam: false,
    query: {
      size: 10,
      page: 1,
      name: '',
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
  const [memberParams, setMemberParams] = useLocalStorage(
    'AttendanceParams',
    {}
  );

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
  const { data, refetch, isFetching, isError } = GetMembers(
    memberParams?.query
  );
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

  const Action = (record) => {
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
            onClick={() => navigator(`/dashboard/member/${record?.record.key}`)}
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
              const time = new Date()?.toLocaleTimeString();
              setState((p) => ({
                ...p,
                controls: {
                  ...p.controls,
                  Id: record.record.key,
                },
              }));

              handleSearchParams('memberId', record.record.key);
              mutateActivity(today.toISOString(), time);
            }}
          >
            {(isLoading && record?.record.key === state.controls.Id) ||
            (state.controls.Id === record?.record.key && AutoLoad) ? (
              <Spin />
            ) : (
              <TbCaptureFilled size={20} />
            )}
          </span>
        </Tips>
        <Tips title={'Take picture'}>
          <span
            onClick={() =>
              setState((p) => ({
                ...p,
                openWebcam: true,
              }))
            }
          >
            {' '}
            <IoCameraSharp size={20} />
          </span>
        </Tips>
      </div>
    );
  };

  const columns = Columns(Action);
  const handlePagination = (pageNumber, limit) => {
    setMemberParams((p) => ({
      ...p,
      query: {
        ...p.query,
        page: pageNumber,
        limit,
      },
    }));

    handleSearchParams('page', pageNumber);
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
      <Camera
        open={state?.openWebcam}
        onCancel={() => setState((p) => ({ ...p, openWebcam: true }))}
        setState={setState}
      />
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
        <SearchBars
          state={state}
          setState={setState}
          refetch={refetch}
          setMemberParams={setMemberParams}
          memberParams={memberParams}
          handleSearchParams={handleSearchParams}
        />
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
