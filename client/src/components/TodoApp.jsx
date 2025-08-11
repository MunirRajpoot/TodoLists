import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import CustomCard from "./CustomCard.jsx";
import CustomTable from "./CustomTable.jsx";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  IconButton
} from "@mui/material";
import { Delete, Edit, CheckCircle, Padding } from "@mui/icons-material";
import CustomButton from "./CustomButton.jsx";

const TodoApp = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

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

  const cards = [
    { id: 1, title: "Total Tasks", count: todos.length },
    { id: 2, title: "Pending Tasks", count: todos.filter(t => !t.completed).length },
    { id: 3, title: "Completed Tasks", count: todos.filter(t => t.completed).length },
  ];

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (id, text) => {
    console.log("Edit Todo:", id, text);
    // Implement your editing logic here
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
            completedAt: !todo.completed ? new Date() : null,
          };
        }
        return todo;
      })
    );
  };

  // Table Columns
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
        <IconButton
          color="primary"
          onClick={() => startEditing(row.id, row.title)}
        >
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


  // Table Rows
  // const rows = todos.map((todo) => ({
  //   id: todo.id,
  //   title: todo.text,
  //   description: todo.description || "",
  //   status: todo.completed ? "Completed" : "Pending",
  // }));

  // Table Rows (FOR TESTING ONLY - using dummy data)
  const rows = [
    { id: 1, title: "Buy groceries", description: "Milk, Eggs, Bread", status: "Pending" },
    { id: 2, title: "Meeting with client", description: "Project update at 3PM", status: "Completed" },
    { id: 3, title: "Workout", description: "Gym session at 6PM", status: "Pending" },
  ];


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
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
          elevation={3}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
              Welcome, {user.name}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {user.email}
            </Typography>
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
            inactiveStyles={{}}
          />
        ))}
      </Box>

      {/* Add Task */}
      <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
        <CustomButton sx={{p:2}}>Add Tasks</CustomButton>
      </Box>
      {/* Table */}
      <CustomTable columns={columns} rows={rows} minWidth={700} />
    </Box>
  );
};

export default TodoApp;
