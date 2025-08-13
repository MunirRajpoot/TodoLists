import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
function Navbar() {
    const [user, setUser] = React.useState(null);
    const navigate = useNavigate();
    React.useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <AppBar
            position="static"
            sx={{
                background: 'linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)', // blue gradient
                boxShadow: 'none'
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Left: Logo + App name */}
                    <Box display="flex" alignItems="center">
                        <AdbIcon sx={{ mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            TodoLists
                        </Typography>
                    </Box>

                    {/* Right: Logout button */}
                    {user && (
                        <Button
                            color="inherit"
                            variant="outlined"
                            onClick={logout}
                            sx={{
                                borderColor: 'white',
                                color: 'white',
                                '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }
                            }}
                        >
                            Logout
                        </Button>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;
