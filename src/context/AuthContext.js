import createDataContext from './createDataContext';
import malertApi, {parseApiResponse} from '../api/malert';
import AsyncStorage from '@react-native-community/async-storage';

const initState = {
  token: null,
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
      return {...state, token: action.payload};
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

    if (!validateToken(response.data.token)) {
      throw {response: {status: 400, data: {msg: 'Unknown Token Type'}}};
    }

    await AsyncStorage.setItem('token', response.data.token);
    dispatch({type: 'SIGNIN', payload: response.data.token});
  } catch (error) {
    callback && callback(parseApiResponse(error.response));
  }
};

const signout = dispatch => async () => {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('info');
    dispatch({type: 'SIGNOUT'});
  } catch (error) {
    // console.log(error.message);
  }
};

const restoreSession = dispatch => async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (validateToken(token)) {
      dispatch({type: 'SIGNIN', payload: token});
    }

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

// TODO validate JWT expire
const validateToken = token => token && token.startsWith('JWT ');

export const {Provider, Context} = createDataContext(
  authReducer,
  {signin, signup, signout, restoreSession, getUserInfo, setUserInfo},
  initState,
);
