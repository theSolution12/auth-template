// src/app/(auth)/login/page.tsx
import { AuthForm } from "@/components/auth/auth-form";
import { MagicLinkButton } from "@/components/auth/magic-link-btn";
import { OAuthButtons } from "@/components/auth/o-auth-buttons";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <AuthForm mode="login" />
      <OAuthButtons />
      <MagicLinkButton />
    </div>
  );
}
