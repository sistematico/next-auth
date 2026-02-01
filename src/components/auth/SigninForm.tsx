"use client";

import { useActionState } from "react";
import { signIn } from "@/actions";

const initialState = {
  message: "",
  error: false,
  inputs: {
    email: "",
    password: "",
  },
};

export default function SigninForm() {
  const [state, action, pending] = useActionState(signIn, initialState);

  return (
    <form action={action} className="space-y-4">
      {state.message && <p className="text-red-500">{state.message}</p>}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full rounded border-2 border-gray-300 px-3 py-2 focus:outline-none"
          defaultValue={state.inputs.email}
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <input
          className="w-full rounded border-2 border-gray-300 px-3 py-2 focus:outline-none"
          type="password"
          id="password"
          name="password"
          defaultValue={state.inputs.password}
          required
        />
      </div>
      <button
        className="rounded px-3 py-2 border-2 border-black/50 transition-all hover:bg-black/50 cursor-pointer w-full disabled:opacity-50"
        type="submit"
        disabled={pending}
      >
        {pending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
