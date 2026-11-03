import type { Metadata } from "next";
import { AuthFrame } from "@/components/auth/auth-frame";
import { ForgotPasswordForm } from "@/components/auth/auth-forms";

export const metadata: Metadata = { title: "Reset password", description: "Request password recovery for your LeaseLens account." };

export default function ForgotPasswordPage() {
  return <AuthFrame eyebrow="Account recovery" title="Forgot your password?" description="Enter your work email and we’ll show you the next step for getting back into your workspace."><ForgotPasswordForm /></AuthFrame>;
}
