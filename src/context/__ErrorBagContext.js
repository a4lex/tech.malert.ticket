import createDataContext from './createDataContext';

const errorBagReducer = (state, action) => {
  switch (action.type) {
    case 'MOUNT_ERROR':
      return {...state, errors: [...state.errors, action.payload]};
    case 'UNMOUNT_ERROR':
      return {
        ...state,
        errors: state.errors.filter(error => error !== action.payload),
      };
    default:
      return state;
  }
};

const displayError = dispatch => message => {
  dispatch({type: 'MOUNT_ERROR', payload: message});
};

const removeError = dispatch => message => {
  dispatch({type: 'UNMOUNT_ERROR', payload: message});
};

export const {Provider, Context} = createDataContext(
  errorBagReducer,
  {displayError, removeError},
  {
    errors: [],
  },
);
