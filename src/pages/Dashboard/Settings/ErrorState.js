export const ErrorStatus = (state, setState) => {
  let message = {};
  if (!state.controls.password) {
    setState((p) => ({
      ...p,
      focusPassword: {
        ...p.focusPassword,
        error: true,
        focus: true,
      },
    }));

    message.password = true;
  }
  if (!state.controls.cPassword) {
    setState((p) => ({
      ...p,
      focusCPassword: {
        ...p.focusCPassword,
        error: true,
        focus: true,
      },
    }));
    message.cPassword = true;
  }

  if (!state.controls.oldPassword) {
    setState((p) => ({
      ...p,
      focusOldPassword: {
        ...p.focusOldPassword,
        error: true,
        focus: true,
      },
    }));
    message.oldPassword = true;
  }

  return message;
};
