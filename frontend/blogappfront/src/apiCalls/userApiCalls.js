import axios from "axios";

export const setAuthorizationHeader = ({ email, password, isLoggedIn }) => {
  if (isLoggedIn) {
    const value = `Basic ${btoa(email + ":" + password)}`;
    axios.defaults.headers["Authorization"] = value;
  } else {
    delete axios.defaults.headers["Authorization"];
  }
};

export const addUser = (user) => {
  return axios.post("/api/user/", user);
};

export const login = (creds) => {
  return axios.post("/api/auth/", creds, {
    auth: { username: creds.email, password: creds.password },
  });
};

export const verifyAccount = (email, code) => {
  return axios.post(`/api/auth/verifyAccount?email=${email}&code=${code}`);
};

export const getUsers = (page = 0, size = 5) => {
  return axios.get(`/api/user/getAll?page=${page}&size=${size}`);
};

export const getUser = (id) => {
  return axios.get(`/api/user/${id}`);
};

export const updateUser = (user) => {
  return axios.put("/api/user/", user);
};

export const changePassoword = (myObject) => {
  return axios.post("/api/user/changePassword", myObject);
};

export const forgotPassword = (email) => {
  return axios.post(`/api/user/forgotPassword?email=${email}`);
};

export const deleteAccount = (id) => {
  return axios.delete(`/api/user/${id}`)
}