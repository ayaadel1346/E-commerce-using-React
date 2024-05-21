import axios from '../axios';

export const login = async (email, password) => {
  const response = await axios.post(`/login`, { email, password });
  return response.data;
};

export const register = async (name, email, password) => {
  const response = await axios.post(`/register`, { name, email, password });
  return response.data;
};
