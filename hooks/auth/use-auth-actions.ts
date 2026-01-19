import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/auth-context";
import {
  type RegisterFormValues,
  registerSchema,
  type SignInFormValues,
  signInSchema,
} from "@/types/schemas/auth";
import { toast } from "sonner";

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
      toast.error("Error al crear la cuenta. Revisa los campos e intenta nuevamente.");
      throw error;
    }
    router.push("/dashboard");
  };

  const handleSignIn = async (data: SignInFormValues) => {
    const { error } = await signIn(data);
    if (error) {
      toast.error("Error al iniciar sesión. Revisa los campos e intenta nuevamente.");
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
