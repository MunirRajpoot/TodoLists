import api from '../utils/api'; 

export const getTodos = async () => {
  try {
    const response = await api.get('/todos');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch todos:', error);
    throw error;
  }
};

export const addTodo = async (todoText) => {
  try {
    const response = await api.post('/todos', { text: todoText });
    return response.data;
  } catch (error) {
    console.error('Failed to add todo:', error);
    throw error;
  }
};

export const updateTodo = async (todoId, updates) => {
  try {
    const response = await api.put(`/todos/${todoId}`, updates);
    return response.data;
  } catch (error) {
    console.error('Failed to update todo:', error);
    throw error;
  }
};

export const deleteTodo = async (todoId) => {
  try {
    await api.delete(`/todos/${todoId}`);
  } catch (error) {
    console.error('Failed to delete todo:', error);
    throw error;
  }
};

export const useTodoService = () => {
  return {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
  };
};

