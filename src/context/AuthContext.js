import createDataContext from './createDataContext';
import malertApi, {parseApiResponse} from '../api/malert';
import AsyncStorage from '@react-native-community/async-storage';
import {validateToken, isExpired} from '../helpers/jwtValidator';

const initState = {
  long_token: null,
  short_token: null,
  info: {
    address: 'Unknown',
    longname: 'Unknown',
    mail: 'Unknown',
    name: 'Unknown',
    phone: 'Unknown',
    balance: 'Unknown',
  },
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGNIN':
      return {...state, ...action.payload};
    case 'SET_USER_INFO':
      return {...state, info: {...state.info, ...action.payload}};
    case 'SIGNOUT':
      return initState;
    default:
      return state;
  }
};

const signin = dispatch => async ({mail, password, callback}) => {
  try {
    const response = await malertApi.post('auth.php', {mail, password});

    if (!validateToken(response.data.long_token)) {
      throw {response: {status: 400, data: {msg: 'Unknown Token Type'}}};
    }

    await AsyncStorage.setItem('long_token', response.data.long_token);
    dispatch({type: 'SIGNIN', payload: {long_token: response.data.long_token}});
  } catch (error) {
    callback && callback(parseApiResponse(error.response));
  }
};

const signout = dispatch => async () => {
  try {
    await AsyncStorage.removeItem('long_token');
    await AsyncStorage.removeItem('short_token');
    await AsyncStorage.removeItem('info');
    dispatch({type: 'SIGNOUT'});
  } catch (error) {
    // console.log(error.message);
  }
};

const restoreSession = dispatch => async () => {
  try {
    const long_token = await AsyncStorage.getItem('long_token');
    const short_token = await AsyncStorage.getItem('short_token');

    dispatch({
      type: 'SIGNIN',
      payload: {
        long_token:
          validateToken(long_token) && !isExpired(long_token)
            ? long_token
            : null,
        short_token:
          validateToken(short_token) && !isExpired(long_token)
            ? short_token
            : null,
      },
    });

    const _info = await AsyncStorage.getItem('info');
    let info = JSON.parse(_info);
    if (info) {
      dispatch({type: 'SET_USER_INFO', payload: info});
    }
  } catch (error) {
    // console.log(error.message);
  }
};

const getUserInfo = dispatch => async () => {
  try {
    const response = await malertApi.get('account.php');
    await AsyncStorage.setItem('info', JSON.stringify(response.data));
    dispatch({type: 'SET_USER_INFO', payload: response.data});
  } catch (error) {
    // console.log(error.message);
  }
};

const setUserInfo = dispatch => async (info, callback) => {
  try {
    const response = await malertApi.post('account.php', info);
    dispatch({type: 'SET_USER_INFO', payload: info});
    callback && callback(parseApiResponse(response));
  } catch (error) {
    callback && callback(parseApiResponse(error.response));
  }
};

const signup = dispatch => {
  return ({mail, password}) => {};
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {signin, signup, signout, restoreSession, getUserInfo, setUserInfo},
  initState,
);
