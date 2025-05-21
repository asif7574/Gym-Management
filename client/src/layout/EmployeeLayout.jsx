import React, { useEffect, useState } from "react";
import { Header } from '../components/shared/Header'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from '../components/shared/Footer'
import { LoginHeader } from '../components/shared/LoginHeader'

import { axiosInstance } from "../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData, saveUserData } from "../redux/features/userSlice";

export const EmployeeLayout = () => {
  const { isUserAuth, userData } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const location = useLocation();


    const checkUser = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: "/admin/check-admin",
            });
            dispatch(saveUserData());
        } catch (error) {
            dispatch(clearUserData());
            console.log(error);
        }
    };

    console.log(isUserAuth, "isuserAuth");
    console.log(userData, "userData");

    useEffect(() => {
        checkUser();
    }, [location.pathname]);

  return (
    <div>
        
        { isUserAuth? <LoginHeader/>:<Header/>}
        {/* <LoginHeader/> */}
        {/* <Header/> */}
        <div className="min-h-lvh">
          <Outlet />
        </div>

        <Footer/>
    </div>
  )
}
