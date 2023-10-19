import Loading from "@/components/Loading/Loading";
import Logo from "@/components/Logo/Logo";
import HomeLayout from "@/layout/HomeLayout";
import { loginUser, setError } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
interface FormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, user, error } = useAppSelector((state) => state.user);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Perform form submission logic here
    // e.g., send form data to server, perform validation, etc.
    dispatch(loginUser(data));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    } else if (!isLoading && user?.email) {
      if (router.query && router.query.from) {
        router.push(router.query.from as string);
      } else {
        router.push(router.locale || "/");
      }
    }
    return () => {
      dispatch(setError({ isError: false, error: "" }));
    };
  }, [error, isLoading, user, router]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center bg-gray-100 min-h-screen">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
          <div className="flex justify-center mb-4">
            <Logo></Logo>
          </div>
          <h3 className="text-2xl font-bold text-center">
            Login to your account
          </h3>
          <form
            className="w-ful md:w-[500px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mt-4">
              <div>
                <label className="block" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  {...register("email", { required: true })}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {errors.email && (
                  <span className="text-xs tracking-wide text-red-600">
                    Email field is required
                  </span>
                )}
              </div>
              <div className="mt-4">
                <label className="block">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div className="flex items-baseline justify-between">
                <button
                  type="submit"
                  className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                >
                  Login
                </button>
                <Link
                  href="/signUp"
                  className="text-sm text-blue-600 hover:underline"
                >
                  {`    Don't have an Account?`}
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
};

export default SignIn;
