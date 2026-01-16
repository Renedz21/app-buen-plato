import { z } from "zod";

export const signInSchema = z.object({
  email: z.email({
    message: "El email es inválido",
  }),
  password: z.string().min(8, {
    message: "La contraseña es requerida y debe tener al menos 8 caracteres",
  }),
});

export const registerSchema = z
  .object({
    name: z.string({
      message: "El nombre es inválido",
    }).min(1, {
      message: "El nombre es requerido",
    }),
    email: z.email({
      message: "El email es inválido",
    }),
    password: z.string().min(8, {
      message: "La contraseña es requerida y debe tener al menos 8 caracteres",
    }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial",
    }),
    confirmPassword: z.string().min(8, {
      message: "La contraseña es requerida y debe tener al menos 8 caracteres",
    }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type SignInFormValues = z.infer<typeof signInSchema>;
