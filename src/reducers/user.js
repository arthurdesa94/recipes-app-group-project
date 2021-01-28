const SIGN_IN = 'SING_IN';
const SET_SEARCH = 'SET_SEARCH';

const INITIAL_STATE = {
  email: '',
  setter: false,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SIGN_IN:
    return { ...state, email: action.email };
  case SET_SEARCH:
    return { ...state, setter: action.setter };
  default:
    return state;
  }
};

export default user;
