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
import { EyeOffIcon, EyeIcon, Loader2 } from "lucide-react";
import { useState } from "react";

export default function RegisterPage() {
  const { registerForm, handleRegister } = useAuthActions();
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] = useState<boolean>(false);


  const toggleVisibilityPassword = () => setIsVisiblePassword((prevState) => !prevState);
  const toggleVisibilityConfirmPassword = () => setIsVisibleConfirmPassword((prevState) => !prevState);


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
                    <FieldError errors={[fieldState.error?.message ? { message: fieldState.error.message } : undefined]} />
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
                    <FieldError errors={[fieldState.error?.message ? { message: fieldState.error.message } : undefined]} />
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
                      aria-controls="password"
                      aria-label={isVisiblePassword ? "Hide password" : "Show password"}
                      aria-pressed={isVisiblePassword}
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
            <Controller
              name="confirmPassword"
              control={registerForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-confirm-password">
                    Confirmar contraseña
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="form-rhf-input-confirm-password"
                      aria-invalid={fieldState.invalid}
                      placeholder="********"
                      autoComplete="confirm-password"
                      type={isVisibleConfirmPassword ? "text" : "password"}
                      className="pe-9"
                    />
                    <Button
                      onClick={toggleVisibilityConfirmPassword}
                      variant="ghost"
                      type="button"
                      size="icon"
                      className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isVisibleConfirmPassword ? <EyeOffIcon aria-hidden="true" size={16} /> : <EyeIcon aria-hidden="true" size={16} />}
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
                disabled={registerForm.formState.isSubmitting}
                className="w-full"
              >
                {registerForm.formState.isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : "Registrar"}
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
