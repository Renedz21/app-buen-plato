import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "El nombre es requerido",
    })
    .max(100, {
      message: "El nombre no puede tener más de 100 caracteres",
    }),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
