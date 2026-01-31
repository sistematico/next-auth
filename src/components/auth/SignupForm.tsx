"use client";

import { useActionState } from "react";
import { signUp } from "@/actions";

export default function SignupForm() {
  const [state, action, pending] = useActionState(signUp, null);

  return (
    <form action={action} className="space-y-4">
      {state && <p className="text-red-500">{state}</p>}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <input
          className="w-full rounded border-2 border-gray-300 px-3 py-2 focus:outline-none"
          type="text"
          id="name"
          name="name"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          E-mail
        </label>
        <input
          className="w-full rounded border-2 border-gray-300 px-3 py-2 focus:outline-none"
          type="email"
          id="email"
          name="email"
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
          required
          minLength={8}
        />
      </div>
      <button
        className="rounded px-3 py-2 border-2 border-black/50 transition-all hover:bg-black/50 cursor-pointer w-full disabled:opacity-50"
        type="submit"
        disabled={pending}
      >
        {pending ? "Creating account..." : "Sign Up"}
      </button>
    </form>
  );
}
