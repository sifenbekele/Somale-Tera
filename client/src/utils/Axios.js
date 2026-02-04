import axios from "axios";
import SummaryApi, { baseURL } from "../common/SummaryApi";

const Axios = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true
});

// Request interceptor → attach access token
Axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accesstoken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor → handle errors & token refresh
Axios.interceptors.response.use(
  (response) => response, // pass successful responses
  async (error) => {
    const originRequest = error.config;

    // Refresh access token if 401
    if (error.response?.status === 401 && !originRequest?.retry) {
      originRequest.retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        const newAccessToken = await refreshAccessToken(refreshToken);
        if (newAccessToken) {
          originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return Axios(originRequest); // retry original request
        }
      }
    }

    // Pass backend error message
    if (error.response?.data?.message) {
      return Promise.reject(error.response.data.message);
    }

    return Promise.reject(error);
  }
);

// Refresh token helper
const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await Axios({
      ...SummaryApi.refreshToken,
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    });

    const accessToken = response.data.data.accessToken;
    localStorage.setItem("accesstoken", accessToken);
    return accessToken;
  } catch (error) {
    console.log(error);
  }
};

export default Axios;
