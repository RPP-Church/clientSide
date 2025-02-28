import { useMemo } from 'react';

const TableData = (data) => {
  const Data = useMemo(() => {
    return data?.data?.length > 0
      ? data?.data?.map((item, index) => {
          const dates = new Date(item.assignedDate).toLocaleDateString();
          const dd = item?.absentActivities?.map((c) => c.date).join(' - ');

          return {
            key: item._id,
            sn: index + 1,
            // title: item.title || '---',
            name: item?.memberName,
            phone: item?.phone,
            memberId: item.memberId || '---',
            gender: item.gender,
            assignedDate: dates ? dates : '---',
            absentCount: item.absenceCount,
            absentDates: dd,
            status: item.status,
            membershipType: item.membershipType,
          };
        })
      : [];
  }, [data]);
  return Data;
};

export default TableData;
