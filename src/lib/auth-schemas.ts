import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid work email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  remember: z.boolean(),
});

export const registerSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter a valid work email."),
  company: z.string().trim().min(2, "Enter your company name."),
  password: z.string().min(8, "Use at least 8 characters."),
  confirmPassword: z.string().min(1, "Confirm your password."),
}).refine((values) => values.password === values.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Enter a valid work email."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
