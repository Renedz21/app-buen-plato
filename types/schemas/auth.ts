import { z } from "zod";

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, {
      error: "El nombre es requerido",
    }),
    email: z.email({
      error: "El email es requerido",
    }),
    password: z.string().min(8, {
      error: "La contraseña es requerida y debe tener al menos 8 caracteres",
    }),
    confirmPassword: z.string().min(8, {
      message: "La contraseña es requerida",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type SignInFormValues = z.infer<typeof signInSchema>;
