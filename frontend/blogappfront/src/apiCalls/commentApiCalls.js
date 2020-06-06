import axios from "axios";

export const addComment = (comment) => {
  return axios.post("/api/comment/", comment);
};

export const getBlogComments = (id, page = 0, size = 3) => {
  return axios.get(`/api/comment/comments/${id}?page=${page}&size=${size}`);
};

export const removeComment = (id) => {
  return axios.delete(`/api/comment/${id}`);
};
