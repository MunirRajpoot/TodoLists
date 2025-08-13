import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MenuItem from "@mui/material/MenuItem";
import InputField from "./InputField";
import CustomButton from "./CustomButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const CustomModal = ({
    open,
    handleClose,
    title = "Add Todo",
    subtitle = "",
    todoTitle,
    todoDescription,
    setTodoTitle,
    setTodoDescription,
    todoDate,
    setTodoDate,
    todoTime,
    setTodoTime,
    priority,
    setPriority,
    onSubmit,
    width = 500,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    
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

    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: { timeout: 500 },
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    {/* Header */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Typography variant="h6">{title}</Typography>
                        <IconButton onClick={handleClose} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {subtitle && (
                        <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
                            {subtitle}
                        </Typography>
                    )}

                    {/* Title */}
                    <InputField
                        label="Enter Title"
                        variant="outlined"
                        fullWidth
                        value={todoTitle}
                        onChange={(e) => setTodoTitle(e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    {/* Description */}
                    <InputField
                        label="Enter Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={isMobile ? 2 : 2}
                        value={todoDescription}
                        onChange={(e) => setTodoDescription(e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    {/* Date */}
                    <InputField
                        label="Date"
                        variant="outlined"
                        fullWidth
                        type="date"
                        value={todoDate}
                        onChange={(e) => setTodoDate(e.target.value)}
                        sx={{ mb: 2 }}
                        InputLabelProps={{ shrink: true }}
                    />

                    {/* Time */}
                    <InputField
                        label="Time"
                        variant="outlined"
                        fullWidth
                        type="time"
                        value={todoTime}
                        onChange={(e) => setTodoTime(e.target.value)}
                        sx={{ mb: 2 }}
                        InputLabelProps={{ shrink: true }}
                    />

                    {/* Priority */}
                    <InputField
                        label="Priority"
                        variant="outlined"
                        fullWidth
                        select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        sx={{ mb: 2 }}
                    >
                        <MenuItem value="Low">Low</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="High">High</MenuItem>
                    </InputField>

                    {/* Action Buttons */}
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                        <CustomButton
                            variant="contained"
                            onClick={onSubmit}
                            disabled={!todoTitle.trim() || !todoDescription.trim() || !todoDate || !todoTime || !priority}
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