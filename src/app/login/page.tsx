import type { Metadata } from "next";
import { AuthFrame } from "@/components/auth/auth-frame";
import { LoginForm } from "@/components/auth/auth-forms";

export const metadata: Metadata = { title: "Sign in", description: "Sign in to your LeaseLens workspace." };

export default function LoginPage() {
  return <AuthFrame eyebrow="Welcome back" title="Sign in to LeaseLens" description="Access your lease portfolio and keep important obligations in view."><LoginForm /></AuthFrame>;
}
