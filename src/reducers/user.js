const SIGN_IN = 'SING_IN';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SIGN_IN:
    return { ...state, email: action.email };
  default:
    return state;
  }
};

export default user;
