import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Paper,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const AuthForm = ({
  title,
  onSubmit,
  additionalFields = [],
  email,
  setEmail,
  password,
  setPassword,
  submitButtonText,
  footerText,
  footerLinkText,
  footerLinkPath,
  isLoading,
  error,
  checkboxText
}) => {
  
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#1b1525" }}>
      {/* Left Side - Image & Branding */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderTopLeftRadius: "12px",
          borderBottomLeftRadius: "12px",
        }}
      >
        <Typography variant="h4" sx={{ color: "white", fontWeight: 500, px: 4, textAlign: "center" }}>
          Capturing Moments, Creating Memories
        </Typography>
      </Box>

      {/* Right Side - Form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 3,
          backgroundColor: "#221b2d",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            maxWidth: 400,
            width: "100%",
            backgroundColor: "transparent",
            color: "white",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            {title}
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Box component="form" onSubmit={onSubmit} sx={{ width: "100%" }}>
            {additionalFields.map((field) => (
              <TextField
                key={field.id}
                margin="normal"
                required={field.required || false}
                fullWidth
                name={field.name}
                label={field.label}
                type={field.type || "text"}
                id={field.id}
                value={field.value}
                onChange={field.onChange}
                variant="outlined"
                InputLabelProps={{ style: { color: "#aaa" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": { borderColor: "#555" },
                    "&:hover fieldset": { borderColor: "#888" },
                  },
                }}
              />
            ))}

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{ style: { color: "#aaa" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": { borderColor: "#555" },
                  "&:hover fieldset": { borderColor: "#888" },
                },
              }}
            />

            
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ style: { color: "#aaa" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": { borderColor: "#555" },
                  "&:hover fieldset": { borderColor: "#888" },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                      sx={{ color: "#767070ff" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {checkboxText && (
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <input type="checkbox" id="terms" required={title === "Create an account"} />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {checkboxText}
                </Typography>
              </Box>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#9c6cff",
                "&:hover": { bgcolor: "#8356d4" },
              }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : submitButtonText}
            </Button>

            <Divider sx={{ my: 2, bgcolor: "#555" }} />

            {/* Social Buttons */}
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<GoogleIcon />}
                sx={{ color: "white", borderColor: "#555" }}
              >
                Google
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<AppleIcon />}
                sx={{ color: "white", borderColor: "#555" }}
              >
                Apple
              </Button>
            </Box>

            <Typography variant="body2" align="center">
              {footerText}{" "}
              <Link href={footerLinkPath} sx={{ color: "#9c6cff" }}>
                {footerLinkText}
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default AuthForm;