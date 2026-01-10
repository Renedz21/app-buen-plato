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

export default function LoginPage() {
  const { signInForm, handleSignIn, isSignInLoading } = useAuthActions();
  return (
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
                  <FieldError errors={[fieldState.error]} />
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
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Field orientation="horizontal" className="flex justify-end">
            <Button type="submit" disabled={isSignInLoading}>
              {isSignInLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </>
  );
}
