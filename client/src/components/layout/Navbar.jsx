import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import ProfileModal from "../Todo/ProfileModal";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
    const [user, setUser] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuOpen = Boolean(anchorEl);
    const [openProfileModal, setOpenProfileModal] = React.useState(false);

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

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProfileClick = () => {
        setOpenProfileModal(true);
        handleMenuClose();
    };

    const handleUpdateProfile = async (updatedData) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.put(
                "http://localhost:5000/api/auth/update-profile",
                updatedData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            toast.success("Profile updated successfully!", { position: "top-right" });
        } catch (error) {
            console.error("Error updating profile:", error.response?.data || error.message);
            toast.error("Failed to update profile!", { position: "top-right" });
        }
    };

    return (
        <>
            <AppBar
                position="static"
                sx={{
                    background: "linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)",
                    boxShadow: "none",
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar
                        disableGutters
                        sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                        <Box display="flex" alignItems="center">
                            <AdbIcon sx={{ mr: 1 }} />
                            <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".1rem",
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                TodoLists
                            </Typography>
                        </Box>

                        {user && (
                            <>
                                <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                                    <Avatar 
                                       src={user?.profilePic || ""}
                                        sx={{ bgcolor: "#2979ff" }}
                                    >
                                        {user.name?.[0]?.toUpperCase()}
                                    </Avatar>
                                    </IconButton>

                                <Menu
                                    anchorEl={anchorEl}
                                    open={menuOpen}
                                    onClose={handleMenuClose}
                                    PaperProps={{
                                        elevation: 4,
                                        sx: {
                                            mt: 1.5,
                                            overflow: "visible",
                                            borderRadius: "12px",
                                            minWidth: 180,
                                            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
                                            "& .MuiMenuItem-root": {
                                                borderRadius: "8px",
                                                mx: 0.5,
                                                my: 0.3,
                                            },
                                            "&:before": {
                                                content: '""',
                                                display: "block",
                                                position: "absolute",
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: "background.paper",
                                                transform: "translateY(-50%) rotate(45deg)",
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                                >
                                    <MenuItem onClick={handleProfileClick}>
                                        <ListItemIcon>
                                            <PersonIcon fontSize="small" />
                                        </ListItemIcon>
                                        Profile
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={logout}>
                                        <ListItemIcon>
                                            <LogoutIcon fontSize="small" />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>

            <ProfileModal
                open={openProfileModal}
                handleClose={() => setOpenProfileModal(false)}
                userName={user?.name}
                userEmail={user?.email}
                 userProfilePic={user?.profilePic}
                onUpdateProfile={handleUpdateProfile}
            />
        </>
    );
}

export default Navbar;
