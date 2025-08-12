import React from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

const CustomCard = ({
    title,
    count,
    gradient,
    hoverScale = 1.05,
    onClick,
    isActive,
    activeStyles,
    inactiveStyles,
}) => {
    return (
        <MotionCard
            onClick={onClick}
            sx={{
                height: "100%",
                borderRadius: 3,
                boxShadow: 3,
                background: gradient,
                color: "white",
                cursor: "pointer",
                ...(isActive ? activeStyles : inactiveStyles),
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                    transform: `scale(${hoverScale})`,
                    boxShadow: 6,
                },
            }}
            component={motion.div}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <CardActionArea sx={{ height: "100%" }}>
                <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                        {title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                        {count?.toLocaleString()}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </MotionCard>
    );
};

export default CustomCard;
