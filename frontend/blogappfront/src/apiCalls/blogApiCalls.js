import axios from "axios";

export const addBlog = (blog) => {
  return axios.post("/api/blog/", blog);
};

export const getBlogs = (page = 0, size = 2) => {
  return axios.get(`/api/blog/blogs?sort=id,desc&page=${page}&size=${size}`);
};

export const getById = (id) => {
  return axios.get(`/api/blog/${id}`);
};
export const getUserBlogsById = (id, page = 0, size = 3) => {
  return axios.get(
    `/api/blog/user/${id}/blogs?sort=id,desc&page=${page}&size=${size}`
  );
};

export const getNewBlogCount = (id) => {
  return axios.get(`/api/blog/newBlogsCount/${id}?count=true`);
};

export const getNewBlogs = (id) => {
  return axios.get(`/api/blog/newBlogs/${id}?direction=after`);
};

export const deleteBlog = (id) => {
  return axios.delete(`/api/blog/${id}`);
};

export const updateBlogVm = (blog) => {
  return axios.put("/api/blog/",blog)
}