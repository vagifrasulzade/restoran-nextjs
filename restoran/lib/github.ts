export interface GithubUserListItem {
  id: number;
  login: string;
  avatar_url: string;
}

export interface GithubUserDetail {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
}

const GITHUB_API_BASE = "https://api.github.com/users";
const GITHUB_SEARCH_API_BASE = "https://api.github.com/search/users";

export async function getGithubUsers(): Promise<GithubUserListItem[]> {
  const res = await fetch(GITHUB_API_BASE, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("GitHub users siyahisi yuklenmedi.");
  }

  return res.json();
}

export async function searchGithubUsers(
  username: string
): Promise<GithubUserListItem[]> {
  const query = username.trim();

  if (!query) {
    return [];
  }

  const res = await fetch(
    `${GITHUB_SEARCH_API_BASE}?q=${encodeURIComponent(query)}+in:login&per_page=30`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("GitHub user search yuklenmedi.");
  }

  const data: { items: GithubUserListItem[] } = await res.json();
  return data.items;
}

export async function getGithubUserByUsername(
  username: string
): Promise<GithubUserDetail | null> {
  const res = await fetch(`${GITHUB_API_BASE}/${username}`, {
    next: { revalidate: 60 },
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("GitHub user melumatlari yuklenmedi.");
  }

  return res.json();
}
