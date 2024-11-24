import React from 'react';
import Head from '../../../components/Head';
import Container from '../../../style/container';
import SearchBars from '../Member/component/SearchBar';
import TableComponent from '../Member/component/TableComponent';
import { MemberState } from '../Member/Logics/memberstate';
import { GetArchive } from '../../../services/getArchive';
import { useLocalStorage } from '../../../hook/useLocalStorage';
import QueryParameter from '../Member/component/queryParameter';
import TableData from '../Member/Logics/TableData';
import Columns from '../Member/component/Column'; 

const Index = () => {
  const { state, setState } = MemberState();
  const [memberParams, setMemberParams] = useLocalStorage('ArchiveParams', {});
  const { handleSearchParams } = QueryParameter();

  //! FETCH MEMEBERS
  const { data, isError, isFetching, refetch } = GetArchive(
    memberParams?.query
  );

  const Action = (record) => {
    return (
      <div style={{ display: 'flex', gap: '12px' }}>
        {/* <span
          style={{ cursor: 'pointer' }}
          onClick={() => navigator(`/dashboard/member/${record?.record.key}`)}
        >
          <FaUserEdit size={14} />
        </span>{' '}
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
        </span> */}
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
