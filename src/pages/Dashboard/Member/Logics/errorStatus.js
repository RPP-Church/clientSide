export const ErrorStatus = (state, setState) => {
  let message = {};
  if (!state.controls.category) {
    setState((p) => ({
      ...p,
      focusCategory: {
        ...p.focusCategory,
        error: true,
        focus: true,
      },
    }));

    message.category = true;
  }
  if (!state.controls.firstName) {
    setState((p) => ({
      ...p,
      focusFirstName: {
        ...p.focusFirstName,
        error: true,
        focus: true,
      },
    }));
    message.firstName = true;
  }
  if (!state.controls.lastName) {
    setState((p) => ({
      ...p,
      focusLastName: {
        ...p.focusLastName,
        error: true,
        focus: true,
      },
    }));
    message.lastName = true;
  }
  if (!state.controls.gender) {
    setState((p) => ({
      ...p,
      focusGender: {
        ...p.focusGender,
        error: true,
        focus: true,
      },
    }));
    message.gender = true;
  }
  if (!state.controls.membershipType) {
    setState((p) => ({
      ...p,
      focusMember: {
        ...p.focusMember,
        error: true,
        focus: true,
      },
    }));
    message.membershipType = true;
  }

  return message;
};
