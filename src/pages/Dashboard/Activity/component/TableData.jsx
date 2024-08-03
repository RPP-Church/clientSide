import { useMemo } from 'react';

const TableData = ({ data }) => {
  const Data = useMemo(() => {
    return data?.data?.length > 0
      ? data?.data?.map((item, index) => {
          return {
            key: item._id,
            sn: index + 1,
            serviceName: item.serviceName,
            date: item?.date,
            createdBy: item.createdBy,
            createdAt: item.createdAt,
          };
        })
      : [];
  }, [data]);
  return Data;
};

export default TableData;
