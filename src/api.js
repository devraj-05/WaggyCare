import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const register = (data) => axios.post(`${API_URL}/auth/register`, data);
export const login = (data) => axios.post(`${API_URL}/auth/login`, data);
