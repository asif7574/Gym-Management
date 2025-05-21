import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";

export const Signup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataRes, setDataRes] = useState("");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const employee = {
      role: "employee",
      signup_api: "/staff/signup",
      login_route: "/login",
  };


  const onSubmit = async (data) => {
      try {
          console.log(data,'====data');
          
          const response = await axiosInstance({ method: "POST", url: employee.signup_api, data });
          console.log(response, "====response");
          // console.log(response.data.data.employeeID, "====id");
          setDataRes(response.data.data);
          toast.success("Sign-Up success");
          setIsModalOpen(true);
          
      } catch (error) {
          toast.error("Sign-Up failed");
          console.log(error);
      }
  };
  // console.log(dataRes.employeeID, "=state");
  const closeModal = () => {
    setIsModalOpen(false);
    navigate(employee.login_route);
  };

  return (
   

<div className="min-h-screen  flex items-center justify-center">
      <div className="card w-full max-w-md  shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="form-control mb-4">
            <label className="label" htmlFor="name">
              <span className="label-text">Name</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="input input-bordered"
              {...register("name", { required: "Name is required" })}
            />
            {/* {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>} */}
          </div>

          {/* Email */}
          <div className="form-control mb-4">
            <label className="label" htmlFor="email">
              <span className="label-text">Email</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="input input-bordered"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {/* {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>} */}
          </div>

          {/* Password */}
          <div className="form-control mb-4">
            <label className="label" htmlFor="password">
              <span className="label-text">Password</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="input input-bordered"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {/* {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>} */}
          </div>

          {/* Mobile */}
          <div className="form-control mb-4">
            <label className="label" htmlFor="mobile">
              <span className="label-text">Mobile</span>
            </label>
            <input
              id="mobile"
              type="text"
              placeholder="Enter your mobile number"
              className="input input-bordered"
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit mobile number",
                },
              })}
            />
            {/* {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>} */}
          </div>

          {/* Address */}
          <div className="form-control mb-4">
            <label className="label" htmlFor="address">
              <span className="label-text">Address</span>
            </label>
            <textarea
              id="address"
              placeholder="Enter your address"
              className="textarea textarea-bordered"
              {...register("address", { required: "Address is required" })}
            ></textarea>
            {/* {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>} */}
          </div>

          {/* Role */}
          <div className="form-control mb-4">
            <label className="label" htmlFor="role">
              <span className="label-text">Role</span>
            </label>
            <select
              id="role"
              className="select select-bordered"
              {...register("role", { required: "Role is required" })}
            >
              <option value="">Select a role</option>
              <option value="staff">Staff</option>
              <option value="doctor">Doctor</option>
              <option value="pharmacist">Pharmacist</option>
              <option value="receptionist">Receptionist</option>
              <option value="admin">Admin</option>
            </select>
            {/* {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>} */}
          </div>

          {/* Submit Button */}
          <div className="form-control mt-4">
            <button type="submit" className="btn btn-primary w-full">
              Sign Up
            </button>
          </div>
        </form>
      </div>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box ">
            <h3 className="font-bold text-lg">Signup Successful!</h3>
            <p className="font-bold text-lg">Welcome, {dataRes.name}!</p>
            <p className="font-bold text-lg text-blue-500">Your id is: {dataRes.employeeID}</p>
            <p className="font-bold text-lg">Please contact Admin for Authorization.</p>
            <div className="modal-action">
              <button className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

   
  )
}
