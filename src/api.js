import axios from "axios";
import { isProd } from "../src/config";

const accessControlAllowOrigin = !isProd ? "http://localhost:5174" : "https://backoffice.asf.ma";
const baseURL = !isProd ? "http://localhost:3000" : "https://africa-shining-fuel-server-1.onrender.com";

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": accessControlAllowOrigin,
  },
});
