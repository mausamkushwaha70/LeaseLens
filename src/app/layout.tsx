import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { Providers } from "@/app/providers";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "LeaseLens | Every Lease. Clearly Understood.",
    template: "%s | LeaseLens",
  },
  description:
    "Transform complex commercial lease agreements into structured, searchable insights.",
  // Avoid browser extensions rewriting the DOM before React hydrates.
  other: { "darkreader-lock": "" },
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Providers>
          {children}
          <Toaster position="bottom-right" richColors />
        </Providers>
      </body>
    </html>
  );
}
