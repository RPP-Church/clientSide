import { useMemo } from 'react';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'April',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];
const TableData = ({ data }) => {
  const Data = useMemo(() => {
    return data?.data?.length > 0
      ? data?.data?.map((item, index) => {
          const dates = item?.dateOfBirth?.split('-');
          const month =
            dates && Number(dates[0]) + 1 ? MONTHS[Number(dates[0]) + 1] : '';
          const day = dates && dates[1] ? dates[1] : '';

          return {
            key: item._id,
            sn: index + 1,
            title: item.title || '---',
            firstname: item?.firstName,
            lastname: item.lastName,
            phone: item.phone || '---',
            gender: item.gender,
            dob: month && day ? `${month}-${day}` : '---',
            category: item.category,
          };
        })
      : [];
  }, [data]);
  return Data;
};

export default TableData;
