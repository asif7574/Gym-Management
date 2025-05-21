import { createBrowserRouter } from "react-router-dom";

import { Home } from "../pages/shared/Home";
import { Signup } from "../pages/shared/Signup";
import { Login } from "../pages/shared/Login";


import { EmployeeLayout } from "../layout/EmployeeLayout";
import { ErrorPage } from "../pages/shared/ErrorPage";





import { ProtectedRoutes } from "./ProtectedRoutes";
import { LandingPage } from "../pages/shared/LandingPage";
import { Profile } from "../pages/shared/Profile";





export const router = createBrowserRouter([
    {
      path: "/",
      element: <EmployeeLayout/>,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: "",
          element: <Home/>,
        },
        {
          path: "signup",
          element: <Signup/>,
        },
        {
          path: "login",
          element: <Login/>,
        },
       
        {
          element: <ProtectedRoutes />,
          path: "",
          children: [
            
          
            
            {
              path: "home",
              element: <LandingPage/>,
            },
            {
              path: "profile/:id",
              element: <Profile/>
            },
            
          ]
        },
        
        
      ]
    }
  ]); 