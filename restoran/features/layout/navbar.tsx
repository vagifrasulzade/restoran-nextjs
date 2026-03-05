import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Restoran", href: "#restoran" },
  { label: "Locations", href: "#locations" },
  { label: "Gift cards", href: "#gift-cards" },
  { label: "Order catering", href: "#catering" },
];

export default function Navbar() {
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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <Button asChild className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-none">
          <Link href="#book">Book now</Link>
        </Button>
      </div>
    </header>
  );
}
