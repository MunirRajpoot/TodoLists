import React from "react";
import Button from "@mui/material/Button";

const CustomButton = (props) => {
    return (
        <Button
            variant={props.variant || "contained"}
            color={props.color || "primary"}
            size={props.size || "medium"}
            onClick={props.onClick}
            fullWidth={props.fullwidth || false}
            disabled={props.disabled || false}
            sx={props.sx || {}}
            {...props}
        >
            {props.children}
        </Button>
    );
};

export default CustomButton;
