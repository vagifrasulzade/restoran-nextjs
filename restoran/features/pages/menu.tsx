import { menuCategories } from "@/data/menu";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

const popularItems = menuCategories
  .flatMap((category) => category.items)
  .filter((item) => item.isPopular);

export default async function MenuSection() {
  const t = await getTranslations("menu_section");

  return (
    <section id="menu" className="bg-zinc-950 px-6 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-red-400">{t("brand")}</p>
            <h2 className="mt-2 text-3xl font-extrabold text-white md:text-4xl">{t("title")}</h2>
          </div>
          <p className="text-sm text-white/50">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {popularItems.map((item) => (
            <Link
              key={item.id}
              href={`/menu/${item.id}`}
              className="overflow-hidden rounded-xl border border-white/10 bg-black/40 transition-all duration-200 hover:-translate-y-1 hover:border-red-500/70"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-44 w-full object-cover"
              />

              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-white">{item.name}</h3>
                  <span className="text-base font-bold text-red-400">${item.price.toFixed(2)}</span>
                </div>
                <p className="mt-2 text-sm text-white/60">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
