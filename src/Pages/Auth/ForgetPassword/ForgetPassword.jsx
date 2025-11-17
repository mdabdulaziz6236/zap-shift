import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";

const ForgetPassword = () => {
  const { resetPassword } = useAuth();
  const location = useLocation()
  console.log('from the forget password page<', location)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  /* handleForgetPassword */
  const handleForgetPassword = (data) => {
    const email = data.email;
    resetPassword(email).then(() => {
        navigate(location?.state || '/login')
        alert("Password Reset link send your email !");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card  w-full max-w-sm ">
        <h1 className="pt-3  text-4xl font-extrabold">Forgot Password</h1>
        <p className="font-bold">
          Enter your email address and we’ll send you a reset link.
        </p>
        <div className="card-body">
          <form onSubmit={handleSubmit(handleForgetPassword)}>
            <fieldset className="fieldset">
              {/* email field */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
                className="input"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required.</p>
              )}
              {errors.email?.type === "pattern" && (
                <p className="text-red-500">
                  Please enter a valid email address.
                </p>
              )}
              <button className="btn bg-primary  mt-4">Send</button>
              <div className="text-center pt-3 text-sm">
                Remember your password?{" "}
                <span className="font-extrabold  text-green-500 hover:text-pink-500 hover: underline">
                  {" "}
                  <Link state={location.state} to="/login">
                    Login
                  </Link>
                </span>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
