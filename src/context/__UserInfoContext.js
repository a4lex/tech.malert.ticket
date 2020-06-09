import createDataContext from './createDataContext';
import malertApi from '../api/malert';

const userInfoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {...state, ...action.payload};
    default:
      return state;
  }
};

const getUserInfo = dispatch => async () => {
  try {
    const response = await malertApi.get('account.php');
    dispatch({type: 'SET_USER_INFO', payload: response.data});
  } catch (error) {}
};

const setUserInfo = dispatch => async info => {
  try {
    await malertApi.post('account.php', info);
    dispatch({type: 'SET_USER_INFO', payload: info});
  } catch (error) {}
};

export const {Provider, Context} = createDataContext(
  userInfoReducer,
  {getUserInfo, setUserInfo},
  {
    address: 'Unknown',
    longname: 'Unknown',
    mail: 'Unknown',
    name: 'Unknown',
    phone: 'Unknown',
  },
);
