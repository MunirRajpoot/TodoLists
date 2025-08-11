import React from "react";
import Navbar from "./Nabar.jsx";

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    );
}