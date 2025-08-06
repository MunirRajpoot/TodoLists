import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Link, 
  Paper,
  Avatar,
  CircularProgress
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

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
  error
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 400,
          width: '100%'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Box 
          component="form" 
          onSubmit={onSubmit} 
          sx={{ mt: 3, width: '100%' }}
        >

             {additionalFields.map((field) => (
            <TextField
              key={field.id}
              margin="normal"
              required={field.required || false}
              fullWidth
              name={field.name}
              label={field.label}
              type={field.type || 'text'}
              id={field.id}
              value={field.value}
              onChange={field.onChange}
            />
          ))}
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
         
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : submitButtonText}
          </Button>
          
          <Typography variant="body2" align="center">
            {footerText}{' '}
            <Link href={footerLinkPath} variant="body2">
              {footerLinkText}
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default AuthForm;