import React from "react";
import Navbar from "./Nabar.jsx";
import Footer from "./Footer.jsx";

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
}