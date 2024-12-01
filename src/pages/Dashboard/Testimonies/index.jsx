import { FetchAllTestimonies } from '../../../services/fetchTestimonies';
import { FetchErrorAnimation, Splash } from '../../../components/animation';
import TableData from './components/TableData';
import TableComponent from '../Member/component/TableComponent';

const Index = () => {
  const { isError, isFetching, data, refetch, error } = FetchAllTestimonies();

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
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Testimony',
      dataIndex: 'testimony',
    },
    {
      title: 'Media',
      dataIndex: 'media',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },

    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        return '';
      },
    },
  ];
  const Data = TableData({ data });

  if (isFetching) {
    return <Splash />;
  }

  if (isError) {
    return <FetchErrorAnimation refetch={refetch} error={error} />;
  }

  return (
    <div>
      <div style={{ margin: '10px 0' }}>
        <h3>Total Result : {data?.totalElement ? data?.totalElement : ''}</h3>
      </div>
      <TableComponent
        isFetching={isFetching}
        Data={Data}
        columns={columns}
        handlePagination={() => {}}
        current={data?.current + 1}
        total={data?.totalElement}
      />
    </div>
  );
};

export default Index;
