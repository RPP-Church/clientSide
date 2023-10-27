import propTypes from 'prop-types';
import { useEffect } from 'react';

const Query = ({ searchParams, setAddMember }) => {
  let firstName = searchParams.get('firstName');
  let lastName = searchParams.get('lastName');
  let email = searchParams.get('email');
  let phone = searchParams.get('phone');
  let address = searchParams.get('address');
  let position = searchParams.get('position');
  let membershipType = searchParams.get('membershipType');
  let gender = searchParams.get('gender');
  let department = searchParams.get('department');
  let maritalStatus = searchParams.get('maritalStatus');
  let joinedDate = searchParams.get('joinedDate');
  let DOB = searchParams.get('DOB');
  let interest = searchParams.get('interest');

  const data = {
    firstName,
    lastName,
    email,
    phone,
    address,
    position,
    membershipType,
    gender,
    department,
    maritalStatus,
    joinedDate,
    DOB,
    interest,
  };

  useEffect(() => {
    if (
      data.firstName ||
      data.lastName ||
      data.email ||
      data.phone ||
      data.address ||
      data.position ||
      data.membershipType ||
      data.gender ||
      data.department ||
      data.maritalStatus ||
      data.joinedDate ||
      data.DOB ||
      data.interest
    ) {
      setAddMember((p) => ({
        ...p,
        ...data,
      }));
    }
  }, []);
};

export default Query;

Query.propTypes = {
  searchParams: propTypes.any,
};
