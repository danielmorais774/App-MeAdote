import axios from 'axios';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjY2MjU4NzQsImV4cCI6MTYyODM1Mzg3NCwic3ViIjoiMWQyNWI2MjMtZjExOS00ZWUyLTk3YTYtZjczMTY2OTk5NDA3In0.xsSvc7I0WC6kL5AKJHi8S2y8Qz5dP9w3vveMh4wTroQ';

const api = axios.create({
  baseURL: 'http://192.168.0.100:3333',
  headers: {
    Accept: 'application/json',
    Authorization: `bearer ${token}`,
  },
});

export default api;
