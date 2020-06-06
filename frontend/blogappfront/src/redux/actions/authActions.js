import * as action from "./actions";

export const logoutSuccess = () => {
  return { type: action.LOGOUT_SUCCESS };
};

export const loginSuccess = (user) => {
  return { type: action.LOGIN_SUCCESS, payload: user };
};

export const updateSuccess = (user) => {
  return { type: action.UPDATE_USER, payload: user };
};

export const changePasswordSuccess = (password) => {
  return { type: action.CHANGE_PASSWORD_SUCCESS, payload: password };
};
