import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Box, 
  Typography, 
  Button, 
  TextField, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  IconButton,
  Paper,
  Tabs,
  Tab,
  Divider,
  Checkbox
} from '@mui/material';
import { Delete, Edit, Check, Close } from '@mui/icons-material';

// Date formatting function
const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const TodoApp = () => {
  const { user, logout } = useAuth();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const savedTodos = localStorage.getItem(`todos_${user?.id}`);
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`todos_${user.id}`, JSON.stringify(todos));
    }
  }, [todos, user]);

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo,
        completed: false,
        createdAt: new Date(),
        completedAt: null
      };
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: editText } : todo
    ));
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
          completedAt: !todo.completed ? new Date() : null
        };
      }
      return todo;
    }));
  };

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <Box sx={{ p: 4, maxWidth: 800, margin: '0 auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Todo App</Typography>
        <Button variant="outlined" onClick={logout}>Logout</Button>
      </Box>
      
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <Button 
            variant="contained" 
            onClick={addTodo}
            disabled={!newTodo.trim()}
          >
            Add
          </Button>
        </Box>
      </Paper>

      <Paper elevation={3}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Active Todos" />
          <Tab label="Completed Todos" />
        </Tabs>
        
        {tabValue === 0 && (
          <Box sx={{ p: 2 }}>
            {activeTodos.length === 0 ? (
              <Typography sx={{ p: 2 }}>No active todos. Add one above!</Typography>
            ) : (
              <List>
                {activeTodos.map(todo => (
                  <ListItem key={todo.id}>
                    <Checkbox
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo.id)}
                    />
                    {editingId === todo.id ? (
                      <Box sx={{ display: 'flex', flexGrow: 1, gap: 1 }}>
                        <TextField
                          fullWidth
                          variant="standard"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && saveEdit(todo.id)}
                        />
                        <IconButton onClick={() => saveEdit(todo.id)}>
                          <Check color="primary" />
                        </IconButton>
                        <IconButton onClick={cancelEdit}>
                          <Close color="error" />
                        </IconButton>
                      </Box>
                    ) : (
                      <>
                        <ListItemText 
                          primary={todo.text} 
                          secondary={`Created: ${formatDate(todo.createdAt)}`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton onClick={() => startEditing(todo.id, todo.text)}>
                            <Edit color="primary" />
                          </IconButton>
                          <IconButton onClick={() => deleteTodo(todo.id)}>
                            <Delete color="error" />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </>
                    )}
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        )}
        
        {tabValue === 1 && (
          <Box sx={{ p: 2 }}>
            {completedTodos.length === 0 ? (
              <Typography sx={{ p: 2 }}>No completed todos yet.</Typography>
            ) : (
              <List>
                {completedTodos.map(todo => (
                  <ListItem key={todo.id}>
                    <Checkbox
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo.id)}
                    />
                    <ListItemText 
                      primary={todo.text} 
                      secondary={
                        <>
                          <span>Created: {formatDate(todo.createdAt)}</span>
                          <br />
                          <span>Completed: {formatDate(todo.completedAt)}</span>
                        </>
                      }
                      sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => deleteTodo(todo.id)}>
                        <Delete color="error" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default TodoApp;