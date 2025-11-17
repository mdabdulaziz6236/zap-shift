import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { signInUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || '/' )
      })
      .catch((error) => {
        console.log(error.message);
      });
    console.log(data);
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card  w-full max-w-sm ">
        <h1 className="pt-3  text-4xl font-extrabold">
         Welcome Back
        </h1>
        <p className="font-bold">Login with ZapShift</p>
        <div className="card-body">
          <form onSubmit={handleSubmit(handleLogin)}>
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
              {/* password field */}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
                })}
                className="input"
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is Required.</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">Password must 6 character.</p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500">
                  Password must include uppercase and Lowercase at least one
                  special character (e.g., !@#$%^&*)
                </p>
              )}
              <div>
                <Link state={location?.state}
                  to="/forgetPassword"
                  className="link text-sm hover:font-bold text-green-500 hover:underline hover:text-pink-500 link-hover"
                >
                  Forgot password?
                </Link>
              </div>
              <button className="btn bg-primary  mt-4">Login</button>
              <div className="text-center pt-3 text-sm">
              Don't have any Account ? Please{" "}
                <span className="font-extrabold  text-green-500 hover:text-pink-500 hover: underline">
                  {" "}
                  <Link state={location.state} to="/register">Register</Link>
                </span>
              </div>

            </fieldset>
          </form>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Login;
