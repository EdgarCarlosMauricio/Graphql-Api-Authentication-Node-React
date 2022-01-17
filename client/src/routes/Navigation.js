import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import User from "../pages/User";
import Error404 from "../pages/Error404";
import LayoutBasic from "../layouts/LayoutBasic";

export default function Navigation() { 
    return (
        <Router>
            <Routes>
                <Route path='*' element={<Error404 />} />
                <Route  element={<LayoutBasic />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/:username" element={<User />} />
                </Route>
                
            </Routes>
        </Router>
    )
}