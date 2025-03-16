import Head from '../../../components/Head';
import { GetMembers } from '../../../services/getMembers';
import Container from '../../../style/container';
import Button from '../../../components/Button';
import styled from 'styled-components';
import TableData from './Logics/TableData';
import AddMemberModal from './component/AddMember';
import { ErrorStatus } from './Logics/errorStatus';
import { CreateMember, DeleteMember } from '../../../services/createMember';
import { useNavigate } from 'react-router-dom';
import { FetchErrorAnimation, Splash } from '../../../components/animation';
import SearchBars from './component/SearchBar';
import TableComponent from './component/TableComponent';
import { MemberState } from './Logics/memberstate';
import QueryParameter from './component/queryParameter';
import { useLocalStorage } from '../../../hook/useLocalStorage';
import Columns from './component/Column';
import { FaFileArchive, FaUserEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { Popconfirm, Spin } from 'antd';
import { CreateArchive } from '../../../services/archive';
import {
  AutoCreateActivity,
  FetchAllActivityByDate,
} from '../../../services/fetchActivity';
import CustomNotification from '../../../components/CustomNotification';
import { CaptureAttendance } from '../../../services/captureAttendance';
import { Notification } from '../../../components/Notification';
import { useState } from 'react';

const Wrapper = styled.div`
  .new-post {
    display: flex;
    justify-content: end;
    margin: 2rem 0;
  }
`;

const Index = () => {
  const navigator = useNavigate();
  const { state, setState } = MemberState();
  const { handleSearchParams } = QueryParameter();
  const [memberParams, setMemberParams] = useLocalStorage('memberParams', {});
  const { contextHolder, openNotification } = CustomNotification();
  const [memberId, setID] = useState('');

  //! FETCH MEMEBERS
  const { data, isError, isFetching, refetch } = GetMembers(
    memberParams?.query
  );

  console.log(memberId, 'memberId');

  //! ARCHIVE
  const { mutate: ArchiveMutate, isLoading: loadingArchive } =
    CreateArchive(refetch);

  //! Submit New Member
  const { mutate, isLoading } = CreateMember({
    refetch,
    reset: handleReset,
    onSuccessCreate,
  });
  //! END

  //! DELETE A MEMBER
  const { mutate: deleteMutate, isLoading: loading } = DeleteMember({
    refetch,
    reset: handleReset,
  });

  const MemberId = memberId;

  //! CAPTURE ATTENDANCE
  const { mutate: captureMutate, isLoading: loadCapture } = CaptureAttendance();
  //! END

  //! AUTO CREATE SERVICE
  const { mutate: AutoMutate, isLoading: AutoLoad } = AutoCreateActivity(
    MemberId,
    captureMutate
  );

  //! FETCH ACTIVITY BY DATE
  const { mutate: mutateActivity, isLoading: lo } = FetchAllActivityByDate(
    openNotification,
    AutoMutate,
    MemberId,
    captureMutate
  );

  function onSuccessCreate(data) {
    console.log(data);
    setID(data.data?.record?._id);

    handleReset();
    Notification({ type: 'success', message: data.data?.mesage });
    refetch();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const year = new Date().getFullYear();
    const today = `${month.toString()?.padStart(2, '0')}/${day
      .toString()
      ?.padStart(2, '0')}/${year}`;

    mutateActivity(today);
  }
  const Data = TableData({ data });

  function handleReset() {
    setState((p) => ({
      ...p,
      open: false,
      memberId: '',
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
  }
  const Action = (record) => {
    return (
      <div style={{ display: 'flex', gap: '12px' }}>
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => navigator(`/dashboard/member/${record?.record.key}`)}
        >
          <FaUserEdit size={14} />
        </span>
        <Popconfirm
          title='Archive record'
          description={() => (
            <span style={{ fontWeight: 600, color: 'red' }}>
              Please click ok to archive record
            </span>
          )}
          onConfirm={() => {
            setState((p) => ({
              ...p,
              memberId: record?.record.key,
            }));
            ArchiveMutate(record?.record.key);
          }}
        >
          <span>
            {loadingArchive && state.memberId === record?.record.key ? (
              <Spin size='small' />
            ) : (
              <a href={`#`}>
                <FaFileArchive size={14} />
              </a>
            )}
          </span>
        </Popconfirm>

        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setState((p) => ({
              ...p,
              memberId: record.record.key,
            }));
            deleteMutate(record?.record.key);
          }}
        >
          {state.memberId === record.record.key && loading ? (
            <Spin size='default' />
          ) : (
            <AiFillDelete size={14} />
          )}
        </span>
      </div>
    );
  };
  const columns = Columns(Action);
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

  if (isError) {
    return <FetchErrorAnimation refetch={refetch} />;
  }

  if (isFetching) {
    return <Splash />;
  }

  // name,
  //   gender,
  //   address,
  //   department,
  //   fromDate,
  //   toDate,
  //   membershipType,
  //   maritalStatus,
  //   sort,
  //   dob,
  //   phone,
  //   category,

  return (
    <Container>
      {contextHolder}
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
            disable={isFetching}
          />
        </div>
        <SearchBars
          setState={setState}
          state={state}
          refetch={refetch}
          setMemberParams={setMemberParams}
          handleSearchParams={handleSearchParams}
          memberParams={memberParams}
        />
        <div style={{ margin: '10px 0' }}>
          <h3>Total Result : {data?.totalElement ? data?.totalElement : ''}</h3>
        </div>
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
