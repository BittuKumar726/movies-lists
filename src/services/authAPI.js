import api from "./axiosinstance";

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/api/users/register", userData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post("/api/users/login", userData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUserDetails = async () => {
  try {
    const response = await api.get("/api/users/details");
    return response;
  } catch (error) {
    throw error;
  }
};
