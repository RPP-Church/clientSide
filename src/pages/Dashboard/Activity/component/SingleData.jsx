import { useMemo } from 'react';

const SingleData = ({ data }) => {
  const Data = useMemo(() => {
    return data?.data?.content?.length > 0
      ? data?.data?.content?.map((item, index) => {
          return {
            key: item._id,
            sn: index + 1,
            title: item?.title || '---',
            firstName: item.firstName,
            lastName: item?.lastName,
            gender: item.gender,
            category: item.category,
            phone: item?.phone,
            memberShip: item?.membershipType,
            image: item.profilePicture,
          };
        })
      : [];
  }, [data]);
  return Data;
};

export default SingleData;
