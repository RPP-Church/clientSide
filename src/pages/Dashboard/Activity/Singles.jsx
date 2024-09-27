import Container from '../../../style/container';
import Head from '../../../components/Head';
import { useParams } from 'react-router-dom';
import { GetSingleActivity } from '../../../services/generateAttendance';
import { FetchErrorAnimation, Splash } from '../../../components/animation';
import SingleData from './component/SingleData';
import { Table } from '../../../components/Table';
import Image from '../Member/component/Image';
import { Pager } from '../../../components/Pagination';
import { useLocalStorage } from '../../../hook/useLocalStorage';
import Tips from '../../../components/Tips';
import { FaPhoneFlip } from 'react-icons/fa6';
import { BiNotepad } from 'react-icons/bi';
import NoteModal from './component/NoteModal';
import { useState } from 'react';
import {
  DeleteNote,
  FetchNote,
  SaveNote,
  UpdateNote,
} from '../../../services/note';
import { Switch } from 'antd';

const Singles = () => {
  const { id } = useParams();
  const [state, setState] = useState({
    open: false,
    showNote: false,
    memberId: null,
    controls: {
      comment: '',
      notes: [],
    },
  });

  const [memberParams, setMemberParams] = useLocalStorage(
    'activityListParams',
    { type: 'Present' }
  );

  const { data, refetch, isError, isFetching, error } = GetSingleActivity(
    id,
    memberParams
  );

  //! FETCH NOTE
  const { mutate, isLoading } = FetchNote(setState);
  //! END OF FETCH NOTE

  //! SAVE NOTE
  const { mutate: saveMutate, isLoading: loading } = SaveNote(fetchNote);
  //! END OF SAVE NOTE

  //! DELETE NOTE
  const { mutate: deleteMutate, isLoading: deleteLoading } =
    DeleteNote(fetchNote);
  //! END OF DELETE NOTE

  //! UPDATE NOTE
  const { mutate: updateMutate, isLoading: loadingUpdate } =
    UpdateNote(fetchNote);
  //!END OF UPDATE NOTE
  const DATA = SingleData({ data });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'sn',
    },
    {
      title: '',
      dataIndex: 'image',
      render: (_, record) => {
        return <Image src={record?.image} />;
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
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
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
    },
    {
      title: 'Type',
      dataIndex: 'memberShip',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        return (
          <>
            {record?.phone && (
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <span>
                  <a href={`tel:${record.phone}`}>
                    <FaPhoneFlip size={17} />
                  </a>{' '}
                </span>
                <span>
                  <a
                    href={`#`}
                    onClick={() => {
                      setState((p) => ({
                        ...p,
                        open: true,
                        memberId: record.key,
                      }));
                      mutate(record.key);
                    }}
                  >
                    <BiNotepad size={17} />
                  </a>{' '}
                </span>
              </div>
            )}
          </>
        );
      },
    },
  ];

  function fetchNote() {
    mutate(state.memberId);
  }

  const handlePagination = (pageNumber, limit) => {
    setMemberParams((p) => ({
      ...p,
      page: pageNumber,
      limit,
    }));
  };

  // if (isFetching) {
  //   return <Splash />;
  // }

  if (isError) {
    return <FetchErrorAnimation refetch={refetch} error={error} />;
  }

  return (
    <Container>
      <NoteModal
        saveMutate={saveMutate}
        loading={loading}
        state={state}
        setState={setState}
        isLoading={isLoading}
        deleteMutate={deleteMutate}
        deleteLoading={deleteLoading}
        updateMutate={updateMutate}
        loadingUpdate={loadingUpdate}
      />
      <Head text={'RPP Church Portal'} />
      <div>
        <div className='controller'>
          <h3 style={{ margin: 0 }}>
            Total Result for {memberParams?.type} Attendance for{' '}
            {data?.data?.activity?.date}:{' '}
            {data?.data?.totalElement ? data?.data?.totalElement : ''}
          </h3>
          <div className='switch'>
            <p style={{ margin: 0, fontSize: '.9em' }}>
              Switch to{' '}
              {memberParams?.type === 'Present' ? 'Absent' : 'Present'}
            </p>
            <div style={{ display: 'flex' }}>
              {/* {memberParams?.type !== 'Present' ? ( */}
              <Tips title={memberParams?.type + ' List'}>
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    setMemberParams((p) => ({
                      ...p,
                      type: p.type === 'Present' ? 'Absent' : 'Present',
                    }))
                  }
                >
                  <Switch
                    checkedChildren={memberParams?.type}
                    unCheckedChildren={memberParams?.type}
                    checked={memberParams?.checked}
                    onChange={(e) =>
                      setMemberParams((p) => ({
                        ...p,
                        checked: e,
                      }))
                    }
                    loading={isFetching}
                  />
                </span>
              </Tips>
              {/* // ) : (
              //   <Tips title='Absent List'>
              //     <span
              //       style={{ cursor: 'pointer' }}
              //       onClick={() =>
              //         setMemberParams((p) => ({
              //           ...p,
              //           type: 'Absent',
              //         }))
              //       }
              //     >
              //       <Switch
              //         checkedChildren='开启'
              //         unCheckedChildren='关闭'
              //         defaultChecked
              //       />

              //     </span>
              //   </Tips>
              // )} */}
            </div>
          </div>
        </div>
        <Table
          size='small'
          loading={isFetching}
          columns={columns}
          dataSource={DATA}
          scroll={{ x: true, scrollToFirstRowOnChange: true }}
          pagination={false}
        />
        <div
          style={{ display: 'flex', justifyContent: 'end', margin: '20px 0' }}
        >
          <Pager
            onChange={handlePagination}
            pageSize={10}
            current={data?.data?.current + 1}
            total={data?.data?.totalElement}
          />
        </div>
      </div>
    </Container>
  );
};

export default Singles;
