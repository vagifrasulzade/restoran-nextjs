"use client";

import { Check, ChevronDown, Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMobile } from "@/hooks/use-mobile";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMobile();

  const [open, setOpen] = useState(false);

  const onLocaleChange = (nextLocale: string) => {
    if (nextLocale === locale) {
      setOpen(false);
      return;
    }

    router.replace(pathname, { locale: nextLocale });
    setOpen(false);
  };

  const options = routing.locales.map((item) => ({
    key: item,
    label: t(`languages.${item}`),
    isActive: item === locale,
  }));

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="border-white/20 bg-transparent text-white hover:bg-white/10"
          >
            <Languages className="size-4" />
            {t("select_language")}
          </Button>
        </SheetTrigger>

        <SheetContent side="right">
          <h3 className="mb-4 text-lg font-semibold text-white">{t("select_language")}</h3>

          <div className="space-y-2">
            {options.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => onLocaleChange(option.key)}
                className={`flex w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                  option.isActive
                    ? "border-red-500 bg-red-500/10 text-red-300"
                    : "border-white/15 text-white hover:bg-white/5"
                }`}
              >
                <span>{option.label}</span>
                {option.isActive ? <Check className="size-4" /> : null}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="border-white/20 bg-transparent text-white hover:bg-white/10"
        >
          <Languages className="size-4" />
          {t("select_language")}
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.key}
            onClick={() => onLocaleChange(option.key)}
            className={option.isActive ? "bg-red-500/10 text-red-300" : ""}
          >
            <span>{option.label}</span>
            {option.isActive ? <Check className="size-4" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
