import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import CustomCard from "./CustomCard.jsx";
import CustomTable from "./CustomTable.jsx";
import CustomModal from "./CustomModal.jsx";
import CustomButton from "./CustomButton.jsx";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  IconButton
} from "@mui/material";
import { Delete, Edit, CheckCircle } from "@mui/icons-material";

const TodoApp = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [editTodoId, setEditTodoId] = useState(null);

  // Load todos from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem(`todos_${user?.id}`);
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, [user]);

  // Save todos to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(`todos_${user.id}`, JSON.stringify(todos));
    }
  }, [todos, user]);

  // Cards summary
  const cards = [
    { id: 1, title: "Total Tasks", count: todos.length },
    { id: 2, title: "Pending Tasks", count: todos.filter(t => !t.completed).length },
    { id: 3, title: "Completed Tasks", count: todos.filter(t => t.completed).length },
  ];

  // Add Todo
  const handleSubmit = () => {
    setTodos([
      ...todos,
      {
        id: Date.now(),
        title: todoTitle,
        description: todoDescription,
        completed: false,
        completedAt: null
      }
    ]);
    setTodoTitle("");
    setTodoDescription("");
    setOpen(false);
  };

  // Delete Todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Toggle Complete
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              completedAt: !todo.completed ? new Date() : null,
            }
          : todo
      )
    );
  };

  // Start Editing
  const startEditing = (id) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      setTodoTitle(todo.title);
      setTodoDescription(todo.description || "");
      setEditTodoId(id);
      setEditOpen(true);
    }
  };

  // Submit Edit
  const handleEditSubmit = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editTodoId
          ? { ...todo, title: todoTitle, description: todoDescription }
          : todo
      )
    );
    setEditOpen(false);
    setTodoTitle("");
    setTodoDescription("");
    setEditTodoId(null);
  };

  // Table Columns
  const columns = [
    { field: "title", headerName: "Title" },
    { field: "description", headerName: "Description" },
    {
      field: "status",
      headerName: "Status",
      renderCell: ({ value }) => (
        <Chip
          label={value}
          sx={{
            backgroundColor: value === "Completed" ? "#008A61" : "#AC6E10",
            color: "white",
            fontWeight: "bold",
          }}
        />
      ),
    },
    {
      field: "complete",
      headerName: "Complete",
      renderCell: ({ row }) =>
        row.status !== "Completed" ? (
          <Button
            size="small"
            color="success"
            onClick={() => toggleComplete(row.id)}
            startIcon={<CheckCircle />}
          >
            Complete
          </Button>
        ) : null,
    },
    {
      field: "edit",
      headerName: "Edit",
      renderCell: ({ row }) => (
        <IconButton color="primary" onClick={() => startEditing(row.id)}>
          <Edit />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      renderCell: ({ row }) => (
        <IconButton color="error" onClick={() => deleteTodo(row.id)}>
          <Delete />
        </IconButton>
      ),
    },
  ];

  // Table Rows (from actual todos)
  const rows = todos.map((todo) => ({
    id: todo.id,
    title: todo.title,
    description: todo.description || "",
    status: todo.completed ? "Completed" : "Pending",
  }));

  return (
    <Box sx={{ p: 4, maxWidth: 800, margin: "0 auto" }}>
      {/* User Info */}
      {user && (
        <Paper
          sx={{
            p: 2,
            mb: 3,
            background: "linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)",
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            gap: 2,
            color: "white",
          }}
          elevation={3}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Welcome, {user.name}
            </Typography>
            <Typography variant="body2">{user.email}</Typography>
          </Box>
        </Paper>
      )}

      {/* Cards */}
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
          gap: 2,
          mb: 3,
        }}
      >
        {cards.map((card, index) => (
          <CustomCard
            key={card.id}
            title={card.title}
            count={Number(card.count)}
            gradient={
              index === 0
                ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                : index === 1
                ? "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)"
                : "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)"
            }
            onClick={() => setSelectedCard(index)}
            isActive={selectedCard === index}
            activeStyles={{
              boxShadow: "0 0 15px rgba(255,255,255,0.6)",
            }}
          />
        ))}
      </Box>

      {/* Add Task */}
      <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
        <CustomButton
          sx={{ p: 2 }}
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Add Task
        </CustomButton>
      </Box>

      {/* Add Modal */}
      <CustomModal
        open={open}
        handleClose={() => setOpen(false)}
        title="Add New Todo"
        todoTitle={todoTitle}
        todoDescription={todoDescription}
        setTodoTitle={setTodoTitle}
        setTodoDescription={setTodoDescription}
        onSubmit={handleSubmit}
      />

      {/* Edit Modal */}
      <CustomModal
        open={editOpen}
        handleClose={() => setEditOpen(false)}
        title="Edit Todo"
        todoTitle={todoTitle}
        todoDescription={todoDescription}
        setTodoTitle={setTodoTitle}
        setTodoDescription={setTodoDescription}
        onSubmit={handleEditSubmit}
      />

      {/* Table */}
      <CustomTable columns={columns} rows={rows} minWidth={700} />
    </Box>
  );
};

export default TodoApp;
