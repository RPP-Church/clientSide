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
import { FaListCheck, FaPhoneFlip } from 'react-icons/fa6';
import { FaList } from 'react-icons/fa';

const Singles = () => {
  const { id } = useParams();
  const [memberParams, setMemberParams] = useLocalStorage(
    'activityListParams',
    { type: 'Present' }
  );

  const { data, refetch, isError, isFetching, error } = GetSingleActivity(
    id,
    memberParams
  );

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
              <span>
                <a href={`tel:${record.phone}`}>
                  <FaPhoneFlip size={15} />
                </a>{' '}
              </span>
            )}
          </>
        );
      },
    },
  ];

  const handlePagination = (pageNumber, limit) => {
    setMemberParams((p) => ({
      ...p,
      page: pageNumber,
      limit,
    }));
  };

  if (isFetching) {
    return <Splash />;
  }

  if (isError) {
    return <FetchErrorAnimation refetch={refetch} error={error} />;
  }

  return (
    <Container>
      <Head text={'RPP Church Portal'} />
      <div>
        <div
          style={{
            margin: '10px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h3 style={{ margin: 0 }}>
            Total Result for {memberParams?.type} Attendance for{' '}
            {data?.data?.activity?.date}:{' '}
            {data?.data?.totalElement ? data?.data?.totalElement : ''}
          </h3>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <p style={{ margin: 0, fontSize: '.9em' }}>Switch List</p>
            <div style={{ display: 'flex' }}>
              {memberParams?.type !== 'Present' ? (
                <Tips title='Present List'>
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      setMemberParams((p) => ({
                        ...p,
                        type: 'Present',
                      }))
                    }
                  >
                    <FaListCheck size={15} color='blue' />
                  </span>
                </Tips>
              ) : (
                <Tips title='Absent List'>
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      setMemberParams((p) => ({
                        ...p,
                        type: 'Absent',
                      }))
                    }
                  >
                    <FaList size={15} color='orange' />
                  </span>
                </Tips>
              )}
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
