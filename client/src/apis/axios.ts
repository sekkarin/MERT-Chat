import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_API_URL;
// const AUTH_USER = import.meta.env.AUTH_USER;
// const AUTH_PASSWORD = import.meta.env.AUTH_PASSWORD;

export default axios.create({
  baseURL: BASE_API_URL,
  // auth: {
  //   username: AUTH_USER,
  //   password: AUTH_PASSWORD,
  // },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  // auth: {
  //   username: AUTH_USER,
  //   password: AUTH_PASSWORD,
  // },
});
