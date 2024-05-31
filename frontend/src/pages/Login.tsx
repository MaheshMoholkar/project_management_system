import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/services/mutations";

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

  const useLoginMutation = useLogin();

  const onSubmit = (data: LoginForm) => {
    useLoginMutation.mutate(data);
  };

  return (
    <>
      <div
        className="flex flex-col items-center p-2 h-[400px] md:p-10 text-blue-50 font-semibold"
        style={{
          backgroundImage: 'url("../../Header-bg.svg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPositionX: "-8rem",
        }}
      >
        <img
          src="../../Logo.svg"
          alt="logo"
          className="h-8 md:h-16 md:w-full md:justify-self-center flex-end "
        />
        <div className="md:text-lg mt-6 text-base">
          Project Management System
        </div>
        <div className="mt-16 md:mt-6 md:w-1/3 border rounded-lg bg-white text-black">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex m-8 justify-center text-lg text-gray-600">
              Login to get started
            </div>
            <div className="flex flex-col gap-6 p-12 pt-0">
              <div>
                <label className="text-gray-500">Email</label>
                <Input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="h-10 border border-gray-700"
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
                  className="h-10 border border-gray-700"
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
                  className="rounded-full w-1/2 h-8 bg-blue-600 text-white hover:bg-blue-800 hover:text-white"
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
