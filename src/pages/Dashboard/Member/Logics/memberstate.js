import { useState } from "react";

export const MemberState = () => {
  const [state, setState] = useState({
    open: false,
    query: {
      size: 10,
      page: 1,
      name: '',
      lastName: '',
      phone: '',
      category: '',
      gender: '',
      membershipType: '',
    },
    focusFirstName: {
      error: false,
      focus: false,
    },
    focusLastName: {
      error: false,
      focus: false,
    },
    focusCategory: {
      error: false,
      focus: false,
    },
    focusGender: {
      error: false,
      focus: false,
    },
    focusMember: {
      error: false,
      focus: false,
    },
    controls: {
      category: '',
      firstName: '',
      lastName: '',
      gender: '',
      address: '',
      phone: '',
      email: '',
      spouseName: '',
      maritalStatus: '',
      membershipType: '',
      dateOfBirth: '',
      departments: [],
      joinedDate: '',
      title: '',
    },
  });

  return { state, setState };
};
