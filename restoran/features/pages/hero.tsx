import { Button } from "@/components/ui/button";
import Link from "next/link";

const cards = [
  {
    label: "Order online",
    href: "#order",
    bg: "bg-red-700",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
  },
  {
    label: "Private event",
    href: "#private",
    bg: "bg-black/40",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
  },
  {
    label: "Happy hours",
    href: "#happy",
    bg: "bg-black/40",
    image: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&q=80",
  },
  {
    label: "Weekend brunch",
    href: "#brunch",
    bg: "bg-black/40",
    image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&q=80",
  },
];

const menuCard = {
  label: "MENU",
  image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
};

export default function Hero() {
  return (
    <section className="bg-black py-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-4">
        {/* Left 2x2 grid */}
        <div className="col-span-2 grid grid-cols-2 grid-rows-2 gap-4">
          {cards.map((card) => (
            <Link key={card.href} href={card.href} className="relative overflow-hidden rounded group block">
              <img
                src={card.image}
                alt={card.label}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className={`absolute inset-0 ${card.bg} opacity-40`} />
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl drop-shadow-lg">
                {card.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Right tall menu card */}
        <Link href="#restoran" className="relative overflow-hidden rounded group block">
          <img
            src={menuCard.image}
            alt="Menu"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            style={{ minHeight: "24rem" }}
          />
          <div className="absolute inset-0 bg-black/30" />
          <span className="absolute inset-0 flex items-end justify-center pb-8 text-white font-extrabold text-4xl tracking-widest drop-shadow-xl">
            {menuCard.label}
          </span>
        </Link>
      </div>

      {/* Hero headline */}
      <div className="max-w-7xl mx-auto mt-12 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
          Welcome to <span className="text-red-500">The Grill House</span>
        </h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto mb-8">
          Experience the finest grilled cuisine in town. Book your table or order online today.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-none text-base">
            <Link href="#book">Book now</Link>
          </Button>
          <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-none text-base">
            <Link href="#restoran">View Restoranlar</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
