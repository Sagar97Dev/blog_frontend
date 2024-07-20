import axios from 'axios';

const API_URL_BLOG = 'http://localhost:5000/api/blogs';
const API_URL_USER = 'http://localhost:5000/api/users'

export const registerUser = (user) => axios.post(`${API_URL_USER}/register`, user);

export const login = (user) => axios.post(`${API_URL_USER}/login`, user);

export const getBlogs = (page = 1, keyword = '') => axios.get(`${API_URL_BLOG}/getAllBlogs?pageNumber=${page}&keyword=${keyword}`);

export const getBlogById = (id) => axios.get(`${API_URL_BLOG}/getBlogById/${id}`);

export const createBlog = (blog, token) => axios.post(`${API_URL_BLOG}/createBlog`, blog, { headers: { Authorization: `Bearer ${token}` } });
export const updateBlog = (id, blog, token) => axios.put(`${API_URL_BLOG}/updateBlog/${id}`, blog, { headers: { Authorization: `Bearer ${token}` } });
export const deleteBlog = (id) => axios.delete(`${API_URL_BLOG}/deleteBlog/${id}`);
