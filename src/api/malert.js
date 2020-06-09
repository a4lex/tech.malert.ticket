import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const instance = axios.create({
  baseURL: 'https://malert.tech/api/',
});

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  resp => resp,
  error => {
    // let {result, message} = parseApiResponse(error);
    // error.ownResult = result;
    // error.ownMessage = message;
    return Promise.reject(error);
  },
);

export default instance;

export function parseApiResponse(_r) {
  // console.log(`CODE: ${_r.code}, STATUS: ${_r.status}`);
  if (!_r) {
    /*
     * no internet connection
     */
    return {
      result: false,
      message: 'There is no internet connectiont',
    };
  } else if (_r.status === 200) {
    /*
     * success request
     */
    return {
      result: _r.data.result,
      message: _r.data.msg ? _r.data.msg : 'Request successful',
    };
  } else if (_r.status === 401) {
    /*
     * unauthorized request
     */
    return {
      result: _r.data.result,
      message: _r.data.msg ? _r.data.msg : 'Request unauthorized',
    };
  } else if (_r.status) {
    /*
     * failed request, but got server answer
     */
    return {
      result: _r.data.result,
      message: _r.data.msg ? _r.data.msg : 'Request failed',
    };
  } else {
    /*
     * final try cast error to string
     */
    return {
      result: false,
      message: _r.toString(),
    };
  }
}
