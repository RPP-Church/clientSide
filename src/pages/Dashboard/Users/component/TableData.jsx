import { useMemo } from 'react';

const TableData = ({ data }) => {
  const Data = useMemo(() => {
    return data?.data?.length > 0
      ? data?.data?.map((item, index) => {
          const authP = item.permission?.find((c) => c.name === 'AUTH');
          return {
            key: item._id,
            sn: index + 1,
            firstName: item.firstName,
            lastName: item.lastName,
            title: item?.title,
            email: item?.email,
            gender: item.gender,
            phone: item?.phone,
            memberId: item.memberId,
            permission: authP,
          };
        })
      : [];
  }, [data]);
  return Data;
};

export default TableData;
