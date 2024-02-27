import { useState, useEffect } from "react";
import api from "./api";

const UserService = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("users/me");
        setUserData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  return userData;
};

export default UserService;
