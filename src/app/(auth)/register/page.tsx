import SignupForm from "@/components/auth/SignupForm";

export default function RegisterPage() {
  return (
    <div className="rounded max-w-lg mx-auto border-2 border-black/50 p-4">
      <h2>Register</h2>
      <SignupForm />
    </div>
  );
}
