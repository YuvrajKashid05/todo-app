import api from "./api.js";

export const registerRequest = (payload) => {
  return api.post("/api/auth/register", payload);
};

export const loginRequest = (payload) => {
  return api.post("/api/auth/login", payload);
};
