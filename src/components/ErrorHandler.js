export const ErrorHandler = (error) => {
    if (error?.response) {
      if (error?.response?.data && error?.response?.data?.message) {
        return error.response.data.message;
      } else {
        return error.response?.data || error.response;
      }
    } else if (error?.request) {
      return 'No response from server';
    } else {
      return error?.message;
    }
  };