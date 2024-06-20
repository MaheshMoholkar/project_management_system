import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/services/mutations";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useValidateToken } from "@/services/queries";

export type LoginForm = {
  email: string;
  password: string;
};

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const navigate = useNavigate();
  const { data } = useValidateToken();

  useEffect(() => {
    if (data) {
      navigate("/dashboard");
    }
  }, []);

  const useLoginMutation = useLogin();

  const onSubmit = (data: LoginForm) => {
    useLoginMutation.mutate(data);
  };

  return (
    <>
      <div
        className="login-bg flex flex-col items-center w-full md:p-10 text-blue-50 font-semibold"
        style={{
          backgroundRepeat: "no-repeat",
        }}
      >
        <img
          src="/Logo.svg"
          alt="logo"
          className="mt-20 md:h-16 md:w-full md:justify-self-center flex-end"
        />
        <div className="md:text-lg md:mt-6 text-base">
          Project Management System
        </div>
        <div className="mt-36 md:mt-6 md:w-1/3 w-full px-4 md:border md:rounded-lg bg-white text-black">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex md:mt-12 justify-start md:justify-center text-lg text-gray-600">
              Login to get started
            </div>
            <div className="flex flex-col gap-6 md:p-12 mt-8 md:mt-0">
              <div>
                <label className="text-gray-500">Email</label>
                <Input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="h-12 border border-gray-700"
                />
                {errors.email && (
                  <span className="text-red-600">{errors.email.message}</span>
                )}
              </div>
              <div>
                <label className="text-gray-500">Password</label>
                <Input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="h-12 border border-gray-700"
                />
                {errors.password && (
                  <span className="text-red-600">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="flex justify-end w-full">
                <a
                  href="/forgot-password"
                  className="w-30 text-sm text-blue-600"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  variant="outline"
                  className="rounded-full w-full md:w-1/2 h-10 bg-blue-600 text-white hover:bg-blue-800 hover:text-white"
                >
                  Login
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
