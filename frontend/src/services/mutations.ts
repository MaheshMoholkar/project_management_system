import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject, login, logout, modifyStatus } from "./api";
import { toast } from "sonner";
import { ProjectForm } from "@/pages/CreateProject";
import { LoginForm } from "@/pages/Login";
import { useAppContext } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { DisplayData } from "@/pages/ProjectList";

export function useLogin() {
  const context = useAppContext();
  const navigate = useNavigate();

  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }

  const { setLoggedIn } = context;
  return useMutation({
    mutationFn: (data: LoginForm) => login(data),
    onSuccess: () => {
      setLoggedIn(true);
      navigate("/dashboard");
      toast("Login Succesful");
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.Message || error;
      toast(errorMessage);
    },
  });
}
export function useLogout() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      toast("Logout Successful");
      navigate("/login");
    },
  });
}

export function useModifyStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DisplayData) => modifyStatus(data),
    onSuccess: () => {
      toast("Status Updated!");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["chartdata"] });
    },
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProjectForm) => createProject(data),
    onSuccess: () => {
      toast("Project Created!");
      queryClient.invalidateQueries({ queryKey: ["chartdata"] });
    },
  });
}
