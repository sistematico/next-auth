import SigninForm from "@/components/auth/SigninForm";

export default function LoginPage() {
  return (
    <div className="rounded max-w-lg mx-auto border-2 border-black/50 p-4">
      <h2>Login</h2>
      <SigninForm />
    </div>
  );
}
