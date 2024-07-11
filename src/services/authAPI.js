import api from "./authAPI";

export const registerUser = async (userData) => {
  const response = await api.post("/api/users/register", userData);
  return response;
};

export const loginUser = async (userData) => {
  const response = await api.post("/api/users/login", userData);
  return response;
};

export const getCurrentUserDetails = async (token) => {
  const response = await api.get("/api/user/details");
  return response;
};
