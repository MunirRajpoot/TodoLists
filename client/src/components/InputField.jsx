import React from "react";
import TextField from "@mui/material/TextField";

const InputField = ({
    label,
    variant = "outlined",
    value,
    onChange,
    type = "text",
    placeholder,
    fullWidth = true,
    required = false,
    sx = {},
    ...rest
}) => {
    return (
        <TextField
            label={label}
            variant={variant}
            value={value}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
            required={required}
            fullWidth={fullWidth}
            sx={sx} // Pass custom styles here
            {...rest} // Allow any other MUI props like `error`, `helperText`, etc.
        />
    );
};

export default InputField;
