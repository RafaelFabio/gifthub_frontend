import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import Instructions from "../instructions/Instructions";
import Principal from "../principal/Principal";
import SecretFriend from "../principal/SecretFriend";
import Profile from "../profile/profile";
import Register from "../register/register";
import AdminDashboard from '../admin/adminDash';
import PrivateRoute from './PrivateRoute'; 
import AdminRoute from './AdminRoute'

function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/landing" element={<App />} />
                <Route path="/principal" element={<PrivateRoute />}>
                    <Route index element={<Principal />} />
                </Route>
                <Route path="/instructions" element={<PrivateRoute />}>
                    <Route index element= {<Instructions inLanding={false} />} />
                </Route>
                <Route path="/secret-friend" element={<PrivateRoute />}>
                    <Route index element={<SecretFriend/>} />
                </Route>
                <Route path="/profile" element={<AdminRoute />}>
                    <Route index element={<Profile/>} />
                </Route>
                <Route path="/admin" element={<AdminRoute />}>
                    <Route index element={<AdminDashboard/>} />
                </Route>
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routing;