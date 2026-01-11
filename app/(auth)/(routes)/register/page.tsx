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

export default function RegisterPage() {
  const { registerForm, handleRegister, isRegisterLoading } = useAuthActions();
  return (
    <CardLayout
      title="Crear cuenta"
      description="Ingresa tu nombre, correo electrónico y contraseña para crear una cuenta"
    >
      <>
        <form
          id="form-rhf-input"
          onSubmit={registerForm.handleSubmit(handleRegister)}
        >
          <FieldGroup>
            <Controller
              name="name"
              control={registerForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-name">Nombre</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="John Doe"
                    autoComplete="name"
                    type="text"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={registerForm.control}
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
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={registerForm.control}
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
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={registerForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-confirm-password">
                    Confirmar contraseña
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-confirm-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="********"
                    autoComplete="confirm-password"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Field orientation="horizontal" className="w-full">
              <Button
                type="submit"
                disabled={isRegisterLoading}
                className="w-full"
              >
                {isRegisterLoading ? "Registrando..." : "Registrar"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>
      </>
    </CardLayout>
  );
}
