import en from "@/messages/en.json";

const menu = en.navbar.menu as Record<string, { title: string; href: string }>;

/** Menu item keys derived from messages (en.json / az.json share the same structure) */
export const NAV_MENU_KEYS = Object.keys(menu) as (keyof typeof menu)[];

export type NavMenuKey = (typeof NAV_MENU_KEYS)[number];

export const NAV_MENU_HREFS: Record<NavMenuKey, string> = Object.fromEntries(
	NAV_MENU_KEYS.map((key) => [key, menu[key].href])
) as Record<NavMenuKey, string>;