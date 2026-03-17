import UserCard from "@/features/users/user-card";
import { getGithubUsers, searchGithubUsers } from "@/lib/github";
import { getTranslations } from "next-intl/server";

interface UsersPageProps {
  searchParams: Promise<{ username?: string }>;
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const t = await getTranslations("github");
  const { username = "" } = await searchParams;
  const query = username.trim();

  const users = query ? await searchGithubUsers(query) : await getGithubUsers();

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white md:text-4xl">{t("title")}</h1>
        <p className="mt-2 text-white/60">{t("description")}</p>
      </div>

      <form className="mb-8 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          name="username"
          defaultValue={query}
          placeholder={t("search_placeholder")}
          className="h-11 w-full rounded-lg border border-white/15 bg-zinc-900 px-4 text-white placeholder:text-white/40 focus:border-red-500 focus:outline-none"
        />
        <button
          type="submit"
          className="h-11 rounded-lg bg-red-600 px-6 font-semibold text-white transition-colors hover:bg-red-700"
        >
          {t("search_button")}
        </button>
      </form>

      {query && (
        <p className="mb-4 text-sm text-white/60">
          {t("search_result", { query, count: users.length })}
        </p>
      )}

      {users.length === 0 && (
        <div className="rounded-xl border border-white/10 bg-zinc-900/70 p-6 text-white/70">
          {t("empty_result")}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
