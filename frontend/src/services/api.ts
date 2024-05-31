import { LoginForm } from "@/pages/Login";
import axios from "axios";

const BASE_URL = "http://localhost:8001";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const login = async (data: LoginForm) => {
  return await axiosInstance.post("api/auth/login", data);
};

export const logout = async () => {
  return await axiosInstance.get("/api/auth/logout");
};

export const validateToken = async () => {
  return (await axiosInstance.get("/api/auth/validate-token")).data;
};

export const getProjects = async () => {
  return (await axiosInstance.get("api/projects")).data;
};

export const modifyStatus = async (data: any) => {
  const status = {
    status: data.data.newStatus,
  };
  return await axiosInstance.post(
    `api/projects/${data.data._id}/status`,
    status
  );
};

export const createProject = async (data: any) => {
  return await axiosInstance.post("api/projects", data);
};

export const getCardList = async () => {
  return (await axiosInstance.get("api/projects/cards")).data;
};

export const getChartData = async () => {
  return (await axiosInstance.get("api/projects/chartdata")).data;
};
