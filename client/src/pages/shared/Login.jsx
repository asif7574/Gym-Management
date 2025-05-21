import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";


export const Login = ({ role = "user" }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const user = {
      role: "user",
      login_api: "/admin/login",
      home_route: "/",
      signup_route: "/signup",
  };

 

  console.log(user, "=====user");

  const onSubmit = async (data) => {
      try {
          console.log(data,'====data');
          
          const response = await axiosInstance({ method: "POST", url: user.login_api, data });
          console.log(response, "====response");
          toast.success("Log-in success");
          navigate(user.home_route);
      } catch (error) {
          toast.error(error.response.data.message);
          console.log(error);
          console.log("error=",error.response.data.message);
          
      }
  };

  return (
      <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
              <div className="text-center lg:text-left">
                  <h1 className="text-5xl font-bold">Login now! {role} </h1>
                  <p className="py-6">
                      Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque
                      aut repudiandae et a id nisi.
                  </p>
              </div>
              <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                  <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-control">
                          <label className="label">
                              <span className="label-text">Id</span>
                          </label>
                          <input type="string" {...register("name")} placeholder="name" className="input input-bordered" required />
                      </div>
                      <div className="form-control">
                          <label className="label">
                              <span className="label-text">Password</span>
                          </label>
                          <input
                              type="password"
                              {...register("password")}
                              placeholder="password"
                              className="input input-bordered"
                              required
                          />
                          <label className="label text-xl">
                              <Link to={user.signup_route}>new User ?</Link>
                          </label>
                      </div>
                      <div className="form-control mt-6">
                          <button className="btn btn-primary">Login</button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  );
};
