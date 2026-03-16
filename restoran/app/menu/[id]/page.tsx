import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { getMenuItemById } from "@/data/menu";
import { Link } from "@/i18n/navigation";

interface MenuItemPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MenuItemPage({ params }: MenuItemPageProps) {
  const t = await getTranslations("menu_section");
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isFinite(numericId)) {
    notFound();
  }

  const item = getMenuItemById(numericId);

  if (!item) {
    notFound();
  }

  return (
    <section className="min-h-screen bg-black px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <Link href="/#menu" className="mb-6 inline-block text-sm font-medium text-red-400 hover:text-red-300">
          {t("back_to_menu")}
        </Link>

        <article className="overflow-hidden rounded-2xl border border-red-500/40 bg-zinc-950">
          <img src={item.image} alt={item.name} className="h-72 w-full object-cover sm:h-96" />

          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-3xl font-extrabold text-white">{item.name}</h1>
              <span className="text-2xl font-bold text-red-400">${item.price.toFixed(2)}</span>
            </div>

            <p className="mt-4 text-lg text-white/80">{item.description}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
