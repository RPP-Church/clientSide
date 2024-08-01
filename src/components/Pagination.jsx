import { Pagination } from 'antd';
import propTypes from 'prop-types';

export const Pager = ({ total, onChange, current, pageSize }) => {
  if (total < pageSize) return '';
  return (
    <Pagination
      showSizeChanger={false}
      showQuickJumper={false}
      // onShowSizeChange={onShowSizeChange}
      // defaultCurrent={defaultCurrent}
      total={total}
      onChange={onChange}
      current={current || 0}
      pageSize={pageSize || 20}
      responsive
    />
  );
};

Pager.propTypes = {
  current: propTypes.number,
  pageSize: propTypes.number,
  total: propTypes.number,
  onChange: propTypes.func,
};
