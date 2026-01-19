"use client";

import { useState } from "react";
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
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";

export default function LoginPage() {
  const { signInForm, handleSignIn } = useAuthActions();
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

  const toggleVisibilityPassword = () => setIsVisiblePassword((prevState) => !prevState);

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
                  <div className="relative">
                    <Input
                      {...field}
                      id="form-rhf-input-password"
                      aria-invalid={fieldState.invalid}
                      placeholder="********"
                      autoComplete="password"
                      type={isVisiblePassword ? "text" : "password"}
                    />

                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                      onClick={toggleVisibilityPassword}
                      type="button"
                    >
                      {isVisiblePassword ? <EyeOffIcon aria-hidden="true" size={16} /> : <EyeIcon aria-hidden="true" size={16} />}
                    </Button>
                  </div>
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
                ) : "Iniciar sesión"}
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
