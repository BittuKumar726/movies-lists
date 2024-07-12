import { lazy, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HomeButton from "../general/HomeButton";
import SuspensionWrapper from "../general/Suspension";
import { signup } from "../store/reducer/AuthReducer";
import { handleLoginNavigation } from "../general/Common";
import LoadingSpinner from "../components/loader";

const LeftSlider = lazy(() => import("../general/LeftSlider"));

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.isLoading);
  console.log({ isLoading });
  const onSubmit = async (data) => {
    try {
      if (data.password !== data.confirmPassword) {
        toast.error("Passwords do not match", {
          position: "top-center",
        });
        return;
      }

      const resData = {
        ...data,
        avatar: data?.avatar[0],
      };

      const { payload } = await dispatch(signup(resData));
      if (!payload?.success) {
        throw payload;
      }
      toast.success(payload?.message, {
        position: "top-center",
      });
      handleLoginNavigation("/login", navigate);
    } catch (error) {
      toast.error(error?.message, {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <SuspensionWrapper>
        <LeftSlider />

        <HomeButton />

        <div className="w-full lg:w-2/3 flex justify-center items-center py-14">
          <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-semibold mb-4">Signup</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-2">
                <label htmlFor="email" className="block text-gray-600 mb-2">
                  Fullname
                </label>
                <input
                  type="fullName"
                  id="fullName"
                  placeholder="Enter your fullName"
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                  {...register("fullName", { required: true })}
                />
                {errors.fullName && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              <div className="mb-2">
                <label htmlFor="email" className="block text-gray-600 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              <div className="mb-2">
                <label htmlFor="password" className="block text-gray-600 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-600 mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                  {...register("confirmPassword", { required: true })}
                />
                {errors.confirmPassword && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="avatar" className="block text-gray-600 mb-2">
                  Upload photo
                </label>
                <input
                  type="file"
                  id="avatar"
                  placeholder="Upload your photo"
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                  {...register("avatar", { required: true })}
                />
                {errors.avatar && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              <div className="mb-3">
                <button
                  type="submit"
                  className="flex justify-center gap-1 btn w-full  text-white py-2 px-4 rounded-md bg-red-500  hover:bg-red-400"
                >
                  {isLoading ? (
                    <LoadingSpinner size={20} color="white" />
                  ) : null}
                  Signup
                </button>
              </div>
              <div>
                👉 Already have Store Account?{" "}
                <Link
                  to="/login"
                  className="text-red-500 hover:text-red-300 focus:text-red-300"
                >
                  Login here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </SuspensionWrapper>
    </>
  );
};

export default SignUp;
