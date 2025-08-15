import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const InputField = ({
    label,
    variant = "outlined",
    value,
    onChange,
    type = "text",
    placeholder,
    fullWidth = true,
    required = false,
    icon, // Icon component
    iconPosition = "start", // start or end
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
            sx={sx}
            InputProps={{
                [iconPosition + "Adornment"]: icon ? (
                    <InputAdornment position={iconPosition}>
                        {icon}
                    </InputAdornment>
                ) : null
            }}
            {...rest}
        />
    );
};

export default InputField;
