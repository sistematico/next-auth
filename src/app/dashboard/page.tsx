import { cookies } from "next/headers";
import { getUserFromSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = getUserFromSession(await cookies());

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="text-gray-700 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Protected Area</h2>
        <p className="mb-4">
          This is a protected page that only authenticated users can access.
        </p>
        <div className="bg-gray-50 rounded p-4">
          <h3 className="font-medium mb-2">Your User Information:</h3>
          <ul className="text-sm text-gray-600">
            <li>User ID: {user.id}</li>
            <li>Role: {user.role}</li>
            <li>Status: Authenticated ✓</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
