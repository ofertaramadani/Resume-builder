import axios from "axios";
import router from "@/router";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

export default ({ requiresAuth }) => {
  if (requiresAuth) {
    axiosInstance.defaults.headers.Authorization = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;
  }

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("accessToken");
        router.push("/login").catch((err) => {
          console.error("Router push error:", err);
        });
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

