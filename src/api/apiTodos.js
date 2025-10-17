import api from ".";

export const getTodos = async () => {
  const { data } = await api.get("/todos");
  return data;
};

export const getTodoDetail = async (id) => {
  const { data } = await api.get(`/todos/${id}`);
  return data;
};

export const createTodo = async (body) => {
  const { data } = await api.post(`/todos`, body);
  return data;
};

export const updateTodo = async (id, body) => {
  const { data } = await api.patch(`/todos/${id}`, body);
  return data;
};

export const removeTodo = async (id) => {
  const { data } = await api.delete(`/todos/${id}`);
  return data;
};
