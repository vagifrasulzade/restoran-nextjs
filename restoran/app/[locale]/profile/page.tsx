"use client";

import { useSession, signOut } from "next-auth/react";
import { Link } from "@/i18n/navigation";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-16 text-white">
        Loading...
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
          <p className="text-zinc-300 mb-4">You are not logged in.</p>
          <Link href="/login" className="text-orange-400 hover:text-orange-300 font-medium">
            Go to login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <h1 className="text-2xl font-bold text-white mb-4">Profile</h1>
        <div className="space-y-2 text-zinc-300 mb-6">
          <p>
            <span className="text-zinc-500">Name:</span> {session.user.name ?? "-"}
          </p>
          <p>
            <span className="text-zinc-500">Email:</span> {session.user.email ?? "-"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
        >
          Log out
        </button>
      </div>
    </main>
  );
}
