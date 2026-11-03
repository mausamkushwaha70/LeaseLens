import type { Metadata } from "next";
import { AuthFrame } from "@/components/auth/auth-frame";
import { RegisterForm } from "@/components/auth/auth-forms";

export const metadata: Metadata = { title: "Create an account", description: "Create a LeaseLens workspace for your commercial lease portfolio." };

export default function RegisterPage() {
  return <AuthFrame eyebrow="Get started" title="Create your workspace" description="Set up a LeaseLens profile for you and your lease team."><RegisterForm /></AuthFrame>;
}
