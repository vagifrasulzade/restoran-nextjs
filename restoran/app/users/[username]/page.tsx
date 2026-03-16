import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { getGithubUserByUsername } from "@/lib/github";

interface UserDetailPageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const t = await getTranslations("github");
  const { username } = await params;
  const user = await getGithubUserByUsername(username);

  if (!user) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/users" className="mb-8 inline-block text-sm font-medium text-red-400 hover:text-red-300">
        {t("back_to_users")}
      </Link>

      <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6 md:p-8">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <Image
            src={user.avatar_url}
            alt={`${user.login} avatar`}
            width={112}
            height={112}
            className="h-28 w-28 rounded-full border border-white/20 object-cover"
          />

          <div>
            <h1 className="text-3xl font-extrabold text-white">
              {user.name ?? user.login}
            </h1>
            <p className="text-white/60">@{user.login}</p>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <section>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-white/50">{t("biography")}</h2>
            <p className="text-white/85">{user.bio ?? t("bio_empty")}</p>
          </section>

          <section className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase text-white/50">{t("followers")}</p>
              <p className="mt-1 text-2xl font-bold text-red-400">{user.followers}</p>
            </div>

            <div className="rounded-lg border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase text-white/50">{t("following")}</p>
              <p className="mt-1 text-2xl font-bold text-red-400">{user.following}</p>
            </div>

            <div className="rounded-lg border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase text-white/50">{t("public_repos")}</p>
              <p className="mt-1 text-2xl font-bold text-red-400">{user.public_repos}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
