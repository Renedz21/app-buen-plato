import { describe, it, expect } from "vitest";
import {
  signInSchema,
  registerSchema,
  type RegisterFormValues,
  type SignInFormValues,
} from "@/types/schemas/auth";

describe("signInSchema", () => {
  it("validates correct credentials", () => {
    const validData: SignInFormValues = {
      email: "test@example.com",
      password: "password123",
    };
    const result = signInSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("rejects invalid email format", () => {
    const result = signInSchema.safeParse({
      email: "invalid-email",
      password: "password123",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty email", () => {
    const result = signInSchema.safeParse({
      email: "",
      password: "password123",
    });
    expect(result.success).toBe(false);
  });

  it("rejects password shorter than 8 characters", () => {
    const result = signInSchema.safeParse({
      email: "test@example.com",
      password: "short",
    });
    expect(result.success).toBe(false);
  });

  it("accepts password with exactly 8 characters", () => {
    const result = signInSchema.safeParse({
      email: "test@example.com",
      password: "12345678",
    });
    expect(result.success).toBe(true);
  });
});

describe("registerSchema", () => {
  const validData: RegisterFormValues = {
    name: "John Doe",
    email: "john@example.com",
    password: "securepass123",
    confirmPassword: "securepass123",
  };

  it("validates correct registration data", () => {
    const result = registerSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("rejects empty name", () => {
    const result = registerSchema.safeParse({
      ...validData,
      name: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects mismatched passwords", () => {
    const result = registerSchema.safeParse({
      ...validData,
      confirmPassword: "differentpass",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const confirmPasswordError = result.error.issues.find(
        (issue) => issue.path.includes("confirmPassword")
      );
      expect(confirmPasswordError?.message).toBe("Las contraseñas no coinciden");
    }
  });

  it("rejects password shorter than 8 characters", () => {
    const result = registerSchema.safeParse({
      ...validData,
      password: "short",
      confirmPassword: "short",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email in registration", () => {
    const result = registerSchema.safeParse({
      ...validData,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("validates name with special characters", () => {
    const result = registerSchema.safeParse({
      ...validData,
      name: "José María García-López",
    });
    expect(result.success).toBe(true);
  });
});
