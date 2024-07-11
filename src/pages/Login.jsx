import { lazy, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import authApi from "../api/authApi";
import HomeButton from "../general/HomeButton";
import { LS_KEY_USER_TOKENS } from "../utils/constants";
import { handleLoginNavigation } from "./Common";
import SuspensionWrapper from "../general/Suspension";

const LeftSlider = lazy(() => import("../general/LeftSlider"));

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const resData = await authApi.post("/api/users/login", data);

      if (resData?.statusCode === 200) {
        const userTokens = {
          AccessToken: resData?.data?.accessToken,
          RefreshToken: resData?.data?.refreshToken,
        };
        toast.success(resData?.message, {
          position: "top-center",
        });
        localStorage.setItem(LS_KEY_USER_TOKENS, JSON.stringify(userTokens));
        handleLoginNavigation("/home", navigate);
      }
    } catch (error) {
      console.log({ error });
      toast.error(error?.message, {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SuspensionWrapper>
        <LeftSlider />
        <HomeButton />
        <div className="w-full lg:w-2/3 flex justify-center items-center py-24">
          <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
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
              <div className="mb-4">
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
                <button
                  type="submit"
                  className="btn w-full  text-white py-2 px-4 rounded-md bg-red-500  hover:bg-red-300 focus:bg-red-300"
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : null}
                  Login
                </button>
              </div>

              <div className="flex justify-center">
                <span className=" text-red-500 hover:text-red-300 focus:text-red-300 cursor-pointer">
                  Forgot password?
                </span>
              </div>
              <div>
                👉 Do not have Account?{" "}
                <Link
                  to="/signup"
                  className="text-red-500 hover:text-red-300 focus:red-red-300"
                >
                  Signup here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </SuspensionWrapper>
    </>
  );
};

export default Login;
