import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {validateToken, isExpired} from '../helpers/jwtValidator';

const instance = axios.create({
  baseURL: 'https://malert.tech/api/',
});

instance.interceptors.request.use(
  async config => {
    const short_token = await AsyncStorage.getItem('short_token');
    if (validateToken(short_token) && !isExpired(short_token)) {
      config.headers.Authorization = short_token;
    } else {
      config.headers.Authorization = await refresh_token();
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

async function refresh_token() {
  try {
    let long_token = await AsyncStorage.getItem('long_token');
    const response = await axios.get('https://malert.tech/api/refresh.php', {
      headers: {Authorization: long_token},
    });
    let short_token = response.data.short_token;
    await AsyncStorage.setItem('short_token', short_token);
    return short_token;
  } catch (e) {
    await AsyncStorage.removeItem('long_token');
    await AsyncStorage.removeItem('short_token');
    await AsyncStorage.removeItem('info');
    return null;
  }
}
