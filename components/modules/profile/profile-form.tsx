"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { profileSchema, type ProfileFormValues } from "@/types/schemas/profile";

interface ProfileFormProps {
  userId: string;
  initialName: string;
}

export function ProfileForm({ userId, initialName }: ProfileFormProps) {
  const router = useRouter();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: initialName,
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const supabase = createClient();

      const { error } = await supabase
        .from("profiles")
        .update({ name: data.name })
        .eq("user_id", userId);

      if (error) throw error;

      toast.success("Perfil actualizado correctamente");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Error al actualizar el perfil",
      );
    }
  };

  const hasChanges = form.formState.isDirty;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Field>
        <FieldLabel htmlFor="name">Nombre</FieldLabel>
        <Input
          id="name"
          type="text"
          placeholder="Tu nombre"
          disabled={form.formState.isSubmitting}
          {...form.register("name")}
        />
        <FieldError errors={[form.formState.errors.name]} />
      </Field>

      <Button
        type="submit"
        disabled={!hasChanges || form.formState.isSubmitting}
      >
        {form.formState.isSubmitting && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        Guardar cambios
      </Button>
    </form>
  );
}
