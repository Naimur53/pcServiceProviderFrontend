import Loading from "@/components/Loading/Loading";
import Logo from "@/components/Logo/Logo";
import HomeLayout from "@/layout/HomeLayout";
import { createUser, setError } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
interface FormData {
  name: string;
  email: string;
  password: string;
  contactNo: string;
  address: string;
}

const SignUp: React.FC = () => {
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
    console.log({ data });
    dispatch(createUser(data));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    } else if (!isLoading && user?.email) {
      router.push(router.locale || "/");
    }
    return () => {
      dispatch(setError({ isError: false, error: "" }));
    };
  }, [error, isLoading, user, router, dispatch]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center bg-gray-100">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <h3 className="text-2xl font-bold text-center">
            Create Your Account
          </h3>
          <form
            className="w-ful md:w-[500px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mt-4">
              <div>
                <label className="block" htmlFor="name">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  {...register("name", { required: true })}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {errors.name && (
                  <span className="text-xs tracking-wide text-red-600">
                    Name field is required
                  </span>
                )}
              </div>
              <div>
                <label className="block" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
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
                {errors.password && (
                  <span className="text-xs tracking-wide text-red-600">
                    Password field is required
                  </span>
                )}
              </div>
              <div className="mt-4">
                <label className="block">contactNo</label>
                <input
                  type="number"
                  placeholder="Contact No"
                  {...register("contactNo", { required: true })}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {errors.contactNo && (
                  <span className="text-xs tracking-wide text-red-600">
                    contactNo field is required
                  </span>
                )}
              </div>
              <div className="mt-4">
                <label className="block">address</label>
                <input
                  type="text"
                  placeholder="Address"
                  {...register("address", { required: true })}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {errors.address && (
                  <span className="text-xs tracking-wide text-red-600">
                    address field is required
                  </span>
                )}
              </div>
              <div className="flex items-baseline justify-between">
                <button
                  type="submit"
                  className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                >
                  Sign Up
                </button>
                <Link
                  href="/signIn"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Already have an account?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
};

export default SignUp;
