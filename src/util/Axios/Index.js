import axios from 'axios';

const axiosInstance = axios.create({
  timeout: 10000,
  baseURL: "https://api.themoviedb.org/3/",
});

export default axiosInstance;