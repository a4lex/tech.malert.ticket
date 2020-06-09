export default function parseAxiosError(error) {
  // if (error.msg && error.result) {
  //   // try get error message from server
  //   return {
  //     result: error.result,
  //     message: error.msg,
  //   };
  // } else
  if (error.response.data) {
    // try get error message from server
    return {
      result: error.response.data.result,
      message: error.response.data.msg,
    };
  } else if (!error.status && !error.code) {
    // when status and code empty - no internet connection
    return {result: false, message: 'There is no internet connectiont'};
  } else {
    // final try cast error to string
    return {result: false, message: error.toString()};
  }
}
