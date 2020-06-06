import * as actions from "../actions/actions";

let defaultState = {
  isLoggedIn: false,
  id: null,
  email: null,
  firstName: null,
  lastName: null,
  image: null,
  password: null,
};

const authReducer = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case actions.LOGOUT_SUCCESS:
      return {
        ...defaultState,
      };
    case actions.LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
        ...action.payload,
      };
    case actions.UPDATE_USER:
      return {
        ...state,
        ...action.payload,
      };
    case actions.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        password: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
