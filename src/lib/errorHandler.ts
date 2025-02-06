export const handleAxiosError = (error: any): string => {
  if (error.response && error.response.data && error.response.data.email) {
    return error.response.data.email.join(", ");
  }
  return error.message;
};

export const handleLoginError = (error: any): string => {
  if (error.response && error.response.data && error.response.data.detail) {
    return error.response.data.detail;
  }
  return error.message;
};

export const handleGenericError = (error: any): string => {
  if (error?.response) {
    // The request was made, but the server responded with an error
    return (
      error?.response?.data?.message ||
      error?.response?.data?.email?.join(", ") ||
      error?.response?.data?.detail ||
      error?.response?.data?.error ||
      error?.message
    );
  }
  if (error?.message) {
    // The request was made, but no response was received
    return error?.message;
  }
  if (error?.request) {
    // The request was made, but no response was received
    return "No response received from the server.";
  }
  // Something happened in setting up the request that triggered an Error
  return "An unexpected error occurred.";
};

export const handleErrorMessages = (error: any): string => {
  if (error?.response) {
    // The request was made, but the server responded with an error
    const { data, message } = error.response;

    return (
      data?.data?.message ||
      data?.message ||
      data?.detail ||
      data?.username?.join(",")?.replace("custom ", "") ||
      data?.Error?.join(",") ||
      data?.email?.join(",")?.replace("custom ", "") ||
      data?.error?.join(",") ||
      data?.verification_code?.join(",") ||
      message
    );
  }
  if (error?.message) {
    // The request was made, but no response was received
    return error.message;
  }
  if (error?.request) {
    // The request was made, but no response was received
    return "No response received from the server.";
  }
  // Something happened in setting up the request that triggered an Error
  return "An unexpected error occurred.";
};
