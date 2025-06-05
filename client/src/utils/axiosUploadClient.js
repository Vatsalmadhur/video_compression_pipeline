import axios from "axios";

const axiosUploadClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default axiosUploadClient;

