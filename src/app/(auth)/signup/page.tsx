import { AuthForm } from "@/components/auth/auth-form";
import { OAuthButtons } from "@/components/auth/o-auth-buttons";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AuthForm mode="signup" />
      <OAuthButtons />
    </div>
  );
}