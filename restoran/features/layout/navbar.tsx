"use client";

import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/features/layout/language-switcher";
import { NAV_MENU_HREFS, NAV_MENU_KEYS } from "@/lib/nav-menu";

export default function Navbar() {
  const t = useTranslations("navbar");

  return (
    <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-red-500 font-bold text-xl italic leading-tight">
          <span>The</span>
          <br />
          <span>GRILL HOUSE</span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_MENU_KEYS.map((key) => (
            <Link
              key={key}
              href={NAV_MENU_HREFS[key]}
              className="text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              {t(`menu.${key}.title`)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />

          {/* CTA Button */}
          <Button asChild className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-none">
            <Link href="/#book">{t("book_now")}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
