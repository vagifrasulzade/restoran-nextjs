import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { GithubUserListItem } from "@/lib/github";

interface UserCardProps {
  user: GithubUserListItem;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <Link
      href={`/users/${user.login}`}
      className="group block overflow-hidden rounded-xl border border-white/10 bg-zinc-900/80 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-red-500/70"
    >
      <div className="flex items-center gap-4">
        <Image
          src={user.avatar_url}
          alt={`${user.login} avatar`}
          width={64}
          height={64}
          className="h-16 w-16 rounded-full border border-white/20 object-cover"
        />

        <div>
          <p className="text-xs uppercase tracking-widest text-white/50">GitHub User</p>
          <h3 className="text-lg font-bold text-white group-hover:text-red-400">
            {user.login}
          </h3>
        </div>
      </div>
    </Link>
  );
}
