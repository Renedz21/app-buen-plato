import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  RegisterFormValues,
  registerSchema,
  SignInFormValues,
  signInSchema,
} from "@/types/schemas/auth";
import { useAuth } from "../use-auth";

export function useAuthActions() {
  const router = useRouter();
  const { signIn, signUp } = useAuth();
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const signInForm = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleRegister = async (data: RegisterFormValues) => {
    const { error } = await signUp(data);
    if (error) {
      throw error;
    }
    router.push("/dashboard");
  };

  const handleSignIn = async (data: SignInFormValues) => {
    const { error } = await signIn(data);
    if (error) {
      throw error;
    }
    router.push("/dashboard");
  };

  return {
    registerForm,
    signInForm,
    handleRegister,
    handleSignIn,
    isRegisterLoading: registerForm.formState.isSubmitting,
    isSignInLoading: signInForm.formState.isSubmitting,
  };
}
