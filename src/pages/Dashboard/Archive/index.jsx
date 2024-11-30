import Container from '../../../style/container';
import SearchBars from '../Member/component/SearchBar';
import TableComponent from '../Member/component/TableComponent';
import { MemberState } from '../Member/Logics/memberstate';
import { GetArchive } from '../../../services/getArchive';
import { useLocalStorage } from '../../../hook/useLocalStorage';
import QueryParameter from '../Member/component/queryParameter';
import TableData from '../Member/Logics/TableData';
import Columns from '../Member/component/Column';
import { FaTrashRestore } from 'react-icons/fa';
import { RestoreArchive } from '../../../services/restoreArchive';
import { Popconfirm, Spin } from 'antd';

const Index = () => {
  const { state, setState } = MemberState();
  const [memberParams, setMemberParams] = useLocalStorage('ArchiveParams', {});
  const { handleSearchParams } = QueryParameter();

  //! FETCH MEMEBERS
  const { data, isError, isFetching, refetch } = GetArchive(
    memberParams?.query
  );

  const { mutate, isLoading } = RestoreArchive(refetch);

  const Action = ({ record }) => {
    return (
      <div style={{ display: 'flex', gap: '12px' }}>
        <Popconfirm
          title='Archive record'
          description={() => (
            <span style={{ fontWeight: 600, color: 'red' }}>
              Please click ok to restore archive record
            </span>
          )}
          onConfirm={() => {
            setState((p) => ({
              ...p,
              memberId: record.key,
            }));
            mutate(record.key);
          }}
        >
          <span style={{ cursor: 'pointer' }}>
            {isLoading && state.memberId === record.key ? (
              <Spin size='small' />
            ) : (
              <FaTrashRestore size={14} />
            )}
          </span>
        </Popconfirm>

        {/* <span
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
        </span>  */}
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

  const Data = TableData({ data });

  return (
    <Container>
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
    </Container>
  );
};

export default Index;
