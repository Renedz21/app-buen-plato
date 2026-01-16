"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { useAuthActions } from "@/hooks/auth/use-auth-actions";
import CardLayout from "@/components/modules/auth/card-layout";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const { signInForm, handleSignIn } = useAuthActions();
  return (
    <CardLayout
      title="Iniciar sesión"
      description="Ingresa tu correo electrónico y contraseña para iniciar sesión"
    >
      <>
        <form
          id="form-rhf-input"
          onSubmit={signInForm.handleSubmit(handleSignIn)}
        >
          <FieldGroup>
            <Controller
              name="email"
              control={signInForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="john.doe@example.com"
                    autoComplete="email"
                    type="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error?.message ? { message: fieldState.error.message } : undefined]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={signInForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-password">
                    Contraseña
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="********"
                    autoComplete="password"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error?.message ? { message: fieldState.error.message } : undefined]} />
                  )}
                </Field>
              )}
            />
            <Field orientation="horizontal" className="w-full">
              <Button
                type="submit"
                className="w-full"
                disabled={signInForm.formState.isSubmitting}
              >
                {signInForm.formState.isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ): "Iniciar sesión"}
              </Button>
            </Field>
          </FieldGroup>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/register"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            ¿No tienes cuenta? Regístrate
          </Link>
        </div>
      </>
    </CardLayout>
  );
}
