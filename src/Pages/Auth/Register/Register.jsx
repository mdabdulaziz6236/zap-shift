import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Register = () => {
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  // console.log('in the register page:', location)
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegister = (data) => {
    // console.log("after register", data.photo[0]);
    const profileImage = data.photo[0];
    registerUser(data.email, data.password)
      .then(() => {
        /* 1.store the image and get the photo url */
        const formData = new FormData();
        formData.append("image", profileImage);
        /*2. send the photo to store and get the url   */
        const image_API_URl = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;
        axios.post(image_API_URl, formData).then((res) => {
          const photoURL = res.data.data.url;
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };

          // create user in the database
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user created in the database");
            }
          });
          /* update user profile here to firebase */
          updateUserProfile(userProfile)
            .then(() => {
              navigate(location?.state || "/");
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card  w-full max-w-sm ">
        <h1 className=" text-4xl font-extrabold pt-3">Create an Account</h1>
        <p className="font-bold">Register with ZapShift</p>
        <div className="card-body">
          <form onSubmit={handleSubmit(handleRegister)}>
            <fieldset className="fieldset">
              {/* Name field */}
              <label className="label">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input"
                placeholder="Enter Your Name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Name is required.</p>
              )}
              {/* Image field */}
              <label className="label">Photo</label>
              <input
                type="file"
                {...register("photo", { required: true })}
                className="file-input"
                placeholder="Enter Your Photo."
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Photo is required.</p>
              )}

              {/* email */}
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
              {/* Password */}
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
                <p className="text-red-500">Password is required.</p>
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
              <button className="btn bg-primary mt-4">Register</button>
              <div className="text-center pt-3 text-sm">
                <p>
                  Already! Have an Account? Please{" "}
                  <span className="font-extrabold text-green-500 underline hover:text-pink-500">
                    <Link state={location.state} to="/login">
                      Login
                    </Link>
                  </span>
                </p>
              </div>
            </fieldset>
          </form>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Register;
