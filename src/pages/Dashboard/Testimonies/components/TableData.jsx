import { useMemo } from 'react';

const TableData = ({ data }) => {
  const Data = useMemo(() => {
    return data?.data?.length > 0
      ? data?.data?.map((item, index) => {
          return {
            key: item._id,
            sn: index + 1,
            name: item.name,
            phone: item?.phone,
            testimony: item?.testimony,
            media: item.media || '---',
            date: item?.date || '---',
          };
        })
      : [];
  }, [data]);
  return Data;
};

export default TableData;
