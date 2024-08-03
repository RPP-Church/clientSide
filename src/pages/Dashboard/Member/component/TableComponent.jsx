import { Pager } from '../../../../components/Pagination';
import { Table } from '../../../../components/Table';
import propTypes from 'prop-types';
const TableComponent = ({
  isFetching,
  Data,
  columns,
  handlePagination,
  current,
  total,
}) => {
  return (
    <>
      <Table
        size='small'
        loading={isFetching}
        columns={columns}
        dataSource={Data}
        scroll={{ x: true, scrollToFirstRowOnChange: true }}
        pagination={false}
      />
      <div style={{ display: 'flex', justifyContent: 'end', margin: '20px 0' }}>
        <Pager
          onChange={handlePagination}
          current={current}
          pageSize={10}
          total={total}
        />
      </div>
    </>
  );
};

export default TableComponent;

TableComponent.propTypes = {
  total: propTypes.number,
  current: propTypes.number,
  isFetching: propTypes.bool,
  Data: propTypes.array,
  columns: propTypes.array,
  handlePagination: propTypes.func,
};
