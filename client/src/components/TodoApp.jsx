import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import CustomCard from "./CustomCard.jsx";
import CustomTable from "./CustomTable.jsx";
import CustomModal from "./CustomModal.jsx";
import CustomButton from "./CustomButton.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Typography,
  Paper,
  Chip,
  IconButton
} from "@mui/material";
import { Delete, Edit, CheckCircle } from "@mui/icons-material";

const TodoApp = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [todoDate, setTodoDate] = useState("");
  const [todoTime, setTodoTime] = useState("");
  const [priority, setPriority] = useState("Low");

  const [todos, setTodos] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [editTodoId, setEditTodoId] = useState(null);

  // Load todos from backend
  useEffect(() => {
    if (user) {
      axios.get(`/api/todos/?userId=${user.id}`)
        .then(res => setTodos(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);

  // Save todos
  useEffect(() => {
    if (user) {
      axios.get("http://localhost:5000/api/todos")
        .then(res => setTodos(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);

  // Summary cards
  const cards = [
    { id: 1, title: "Total Tasks", count: todos.length },
    { id: 2, title: "Pending Tasks", count: todos.filter(t => !t.completed).length },
    { id: 3, title: "Completed Tasks", count: todos.filter(t => t.completed).length },
  ];

  // Add Todo
  const handleSubmit = () => {
    axios.post("http://localhost:5000/api/todos", {
      title: todoTitle,
      description: todoDescription,
      date: todoDate,
      time: todoTime,
      priority,
      completed: false,
      completedAt: null
    })
      .then(res => {
        setTodos([...todos, res.data]);
        resetForm();
        setOpen(false);
        toast.success("Todo added successfully!");
      })
      .catch(err => console.error(err));

  };

  // Edit Todo
  const handleEditSubmit = () => {
    axios.put(`http://localhost:5000/api/todos/${editTodoId}`, {
      title: todoTitle,
      description: todoDescription,
      date: todoDate,
      time: todoTime,
      priority
    })
      .then(res => {
        setTodos(todos.map(todo => todo._id === editTodoId ? res.data : todo));
        resetForm();
        setEditOpen(false);
        setEditTodoId(null);
        toast.success("Todo updated successfully!");
      })
      .catch(err => console.error(err));
  };

  // Delete
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
        toast.info("Todo deleted successfully!");
      })
      .catch(err => console.error(err));

  };

  // Toggle complete
  const toggleComplete = (id) => {
    axios.patch(`http://localhost:5000/api/todos/${id}/toggle`)
      .then(res => {
        setTodos(todos.map(todo => todo._id === id ? res.data : todo));
        toast.success(
          res.data.completed ? "Todo marked as completed!" : "Todo marked as pending"
        );
      })
      .catch(err => console.error(err));

  };

  // Start editing
  const startEditing = (id) => {
    const todo = todos.find((t) => t._id === id);
    if (todo) {
      setTodoTitle(todo.title);
      setTodoDescription(todo.description || "");
      setTodoDate(todo.date || "");
      setTodoTime(todo.time || "");
      setPriority(todo.priority || "Low");
      setEditTodoId(id);
      setEditOpen(true);
    }
  };

  const resetForm = () => {
    setTodoTitle("");
    setTodoDescription("");
    setTodoDate("");
    setTodoTime("");
    setPriority("Low");
  };

  // Columns
  const columns = [
    { field: "title", headerName: "Title" },
    { field: "description", headerName: "Description" },
    { field: "date", headerName: "Date" },
    { field: "time", headerName: "Time" },
    { field: "priority", headerName: "Priority" },
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
      field: "actions",
      headerName: "Actions",
      renderCell: ({ row }) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          {row.status !== "Completed" && (
            <IconButton color="success" onClick={() => toggleComplete(row.id)}>
              <CheckCircle />
            </IconButton>
          )}
          <IconButton color="primary" onClick={() => startEditing(row.id)}>
            <Edit />
          </IconButton>
          <IconButton color="error" onClick={() => deleteTodo(row.id)}>
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  // Priority sorting Code
  const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  const sortedTodos = [...todos].sort((a, b) => {
    return (
      priorityOrder[a.priority] - priorityOrder[b.priority] ||
      new Date(a.date) - new Date(b.date) ||
      new Date(`1970-01-01T${a.time}`) - new Date(`1970-01-01T${b.time}`)
    );
  });

  // Rows
  const rows = sortedTodos.map((todo) => ({
    id: todo._id,
    title: todo.title,
    description: todo.description || "",
    date: todo.date || "",
    time: todo.time || "",
    priority: todo.priority || "Low",
    status: todo.completed ? "Completed" : "Pending",
  }));
  return (
    <Box sx={{ p: 4, maxWidth: 1000, margin: "0 auto" }}>
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
          gridTemplateColumns: "repeat(auto-fill, minmax(min(250px, 100%), 1fr))",
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
                  ? "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)"
                  : "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)"
            }
            onClick={() => setSelectedCard(index)}
            isActive={selectedCard === index}
            activeStyles={{ boxShadow: "0 0 15px rgba(255,255,255,0.6)" }}
          />
        ))}
      </Box>

      {/* Add Task */}
      <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
        <CustomButton variant="contained" onClick={() => { resetForm(); setOpen(true) }}>
        <CustomButton variant="contained" onClick={() => { resetForm(); setOpen(true) }}>
          Add Task
        </CustomButton>
      </Box>

      {/* Add Modal */}
      <CustomModal
        open={open}
        handleClose={() => {
          resetForm();
          setOpen(false)
        }
        }
        title="Add New Todo"
        todoTitle={todoTitle}
        todoDescription={todoDescription}
        todoDate={todoDate}
        setTodoDate={setTodoDate}
        todoTime={todoTime}
        setTodoTime={setTodoTime}
        priority={priority}
        setPriority={setPriority}
        setTodoTitle={setTodoTitle}
        setTodoDescription={setTodoDescription}
        onSubmit={handleSubmit}
      />

      {/* Edit Modal */}
      <CustomModal
        open={editOpen}
        handleClose={() => {
          resetForm();
          setEditOpen(false)
        }}
        title="Edit Todo"
        todoTitle={todoTitle}
        todoDescription={todoDescription}
        todoDate={todoDate}
        setTodoDate={setTodoDate}
        todoTime={todoTime}
        setTodoTime={setTodoTime}
        priority={priority}
        setPriority={setPriority}
        setTodoTitle={setTodoTitle}
        setTodoDescription={setTodoDescription}
        onSubmit={handleEditSubmit}
      />

      {/* Table */}
      <CustomTable columns={columns} rows={rows} minWidth={900} />
    </Box>
  );
};

export default TodoApp;
