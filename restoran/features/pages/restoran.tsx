export interface Restaurant {
  restaurantID: number;
  restaurantName: string;
  address: string;
  type: string;
  parkingLot: boolean;
}

async function getRestaurants(): Promise<Restaurant[]> {
  const res = await fetch("https://fakerestaurantapi.runasp.net/api/Restaurant", {
    cache: "no-store", // SSR - always fresh
  });

  if (!res.ok) {
    throw new Error("Restoranları yükləmək mümkün olmadı.");
  }

  return res.json();
}

export default async function Restoran() {
  const restaurants = await getRestaurants();

  return (
    <section id="restoran" className="bg-zinc-950 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
          Restoran<span className="text-red-500">lar</span>
        </h2>
        <p className="text-white/50 mb-10 text-sm">
          Cəmi {restaurants.length} restoran tapıldı
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.restaurantID}
              className="bg-zinc-900 border border-white/10 rounded-lg p-5 hover:border-red-500/60 hover:shadow-lg hover:shadow-red-900/20 transition-all duration-200"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-white font-bold text-lg leading-snug">
                  {restaurant.restaurantName}
                </h3>
                <span className="shrink-0 text-xs font-semibold bg-red-600/20 text-red-400 px-2 py-1 rounded">
                  {restaurant.type}
                </span>
              </div>

              {/* Address */}
              <p className="text-white/50 text-sm flex items-start gap-1.5 mb-4">
                <svg
                  className="shrink-0 mt-0.5 w-4 h-4 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {restaurant.address}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    restaurant.parkingLot
                      ? "bg-green-900/40 text-green-400"
                      : "bg-zinc-800 text-zinc-500"
                  }`}
                >
                  {restaurant.parkingLot ? "Parking mövcuddur" : "Parking yoxdur"}
                </span>
                <span className="text-white/30 text-xs">#{restaurant.restaurantID}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
