export const ErrorHandler = (error) => {
  let message;
  if (error?.response) {
    if (error?.response?.data && error?.response?.data?.message) {
      message = error.response.data.message
        ? error.response.data.message
        : error.response.data;
    } else {
      message = error.response?.data ? error.response?.data : error.response;
    }
  } else if (error?.request) {
    message = 'No response from server';
  } else {
    message = error?.message;
  }

  return message;
};
