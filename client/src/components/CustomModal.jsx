import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import InputField from "./InputField";
import CustomButton from "./CustomButton";

const CustomModal = ({
    open,
    handleClose,
    title = "Add Todo",
    subtitle = "",
    todoTitle,
    todoDescription,
    setTodoTitle,
    setTodoDescription,
    onSubmit,
    width = 500, // Increased width
}) => {
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: width,
        bgcolor: "background.paper",
        borderRadius: "8px",
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    {/* Header with Close Button */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Typography variant="h6" component="h2">
                            {title}
                        </Typography>
                        <IconButton onClick={handleClose} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {subtitle && (
                        <Typography
                            variant="body2"
                            sx={{ mb: 2, color: "text.secondary" }}
                        >
                            {subtitle}
                        </Typography>
                    )}

                    {/* Title Input */}
                    <InputField
                        label="Enter Title"
                        variant="outlined"
                        fullWidth
                        value={todoTitle}
                        onChange={(e) => setTodoTitle(e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    {/* Description Input */}
                    <InputField
                        label="Enter Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={3}
                        value={todoDescription}
                        onChange={(e) => setTodoDescription(e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    {/* Action Buttons */}
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                        <CustomButton
                            variant="contained"
                            onClick={onSubmit}
                            disabled={!todoTitle.trim() || !todoDescription.trim()}
                        >
                            Save
                        </CustomButton>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

export default CustomModal;
