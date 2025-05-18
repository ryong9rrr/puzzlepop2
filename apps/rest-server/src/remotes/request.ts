import axios from 'axios';

export const requestWithFormData = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  timeout: 10000,
  maxRedirects: 0,
  validateStatus: (status) => {
    return status >= 200 && status < 400;
  },
});

export const request = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  maxRedirects: 0,
  validateStatus: (status) => {
    return status >= 200 && status < 400;
  },
});
