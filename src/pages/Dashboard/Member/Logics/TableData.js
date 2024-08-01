import { useMemo } from 'react';

const TableData = ({ data }) => {
  console.log(data?.data)
  const Data = useMemo(() => {
    return data?.data?.length > 0
      ? data?.data?.map((item, index) => {
          return {
            key: item._id,
            sn: index + 1,
            title: item.title || '---',
            firstname: item?.firstName,
            lastname: item.lastName,
            phone: item.phone || '---',
            gender: item.gender,
            dob: item.dateOfBirth || '---',
            category: item.category,
          };
        })
      : [];
  }, [data]);
  return Data;
};

export default TableData;
