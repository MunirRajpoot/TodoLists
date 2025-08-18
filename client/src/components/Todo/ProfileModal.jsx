import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import CustomButton from "./CustomButton";
import InputField from "./InputField";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const ProfileModal = ({
    open,
    handleClose,
    userName,
    userEmail,
    userProfilePic,
    onUpdateProfile, // callback for updating profile
    width = 500,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [profilePic, setProfilePic] = useState(userProfilePic || localStorage.getItem("profilePic") || null);
    const [name, setName] = useState(userName || "");
    const [email, setEmail] = useState(userEmail || "");

    // Sync props with state when modal opens
        useEffect(() => {
        if (open) {
            setName(userName || "");
            setEmail(userEmail || "");
            setProfilePic(userProfilePic || localStorage.getItem("profilePic") || null);
        }
        }, [open, userName, userEmail, userProfilePic]);


   const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
        setProfilePic(reader.result); // base64 string
        localStorage.setItem("profilePic", reader.result);
        };
        reader.readAsDataURL(file);
    }
    };


    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: isMobile ? "90%" : width,
        maxWidth: "95vw",
        maxHeight: "90vh",
        overflowY: "auto",
        bgcolor: "background.paper",
        borderRadius: "8px",
        boxShadow: 24,
        p: isMobile ? 2 : 4,
    };

    const handleUpdate = () => {
        onUpdateProfile?.({
            name,
            email,
            profilePic,
        });
        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{ backdrop: { timeout: 500 } }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    {/* Header */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Typography variant="h6">Update Profile</Typography>
                        <IconButton onClick={handleClose} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Profile Avatar */}
                    <Box sx={{ textAlign: "center", mb: 2 }}>
                        <Avatar src={profilePic} sx={{ width: 80, height: 80, margin: "0 auto" }}>
                            {name?.[0]?.toUpperCase()}
                        </Avatar>
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            id="profile-pic-upload"
                            onChange={handleProfilePicChange}
                        />
                        <label htmlFor="profile-pic-upload">
                            <CustomButton component="span" variant="outlined" sx={{ mt: 1 }}>
                                Upload Picture
                            </CustomButton>
                        </label>
                    </Box>

                    {/* Editable Fields */}
                    <InputField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <InputField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    {/* Update Button */}
                    <CustomButton
                        variant="contained"
                        fullWidth
                        onClick={handleUpdate}
                        disabled={!name.trim() || !email.trim()}
                    >
                        Update
                    </CustomButton>
                </Box>
            </Fade>
        </Modal>
    );
};

export default ProfileModal;
