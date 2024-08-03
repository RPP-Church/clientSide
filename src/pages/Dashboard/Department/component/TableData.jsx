import { useMemo } from 'react';

const TableData = ({ data }) => {
  const Data = useMemo(() => {
    return data?.length > 0
      ? data?.map((item, index) => {
          return {
            key: item._id,
            sn: index + 1,
            name: item.name,
            hod: item?.headOfDepartment,
            phone: item.headOfDepartmentPhone || '---',
            ministerInCharge: item.ministerInCharge || '---',
          };
        })
      : [];
  }, [data]);
  return Data;
};

export default TableData;
