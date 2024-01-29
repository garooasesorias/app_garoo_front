import { jwtDecode } from "jwt-decode";

export const getDecodedToken = () => {
  const token = localStorage.getItem("token");
  return token ? jwtDecode(token) : null;
};

export const isAdmin = () => {
  const decodedToken = getDecodedToken();
  return decodedToken?.role === "administrador";
};
