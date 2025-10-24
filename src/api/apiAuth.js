import api from ".";

export const registerAuth = async (body) => {
  const { data } = await api.post("/auth/register", body);
  return data;
};

export const loginAuth = async (body) => {
  const { data } = await api.post("/auth/login", body);
  return data;
};
