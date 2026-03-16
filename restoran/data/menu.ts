export interface MenuItem {
	id: number;
	name: string;
	price: number;
	image: string;
	description: string;
	isPopular?: boolean;
}

export interface MenuCategory {
	id: string;
	label: string;
	items: MenuItem[];
}

export const menuTabs = ["Menu", "Burger", "French fries", "Contact us", "About"];

export const menuCategories: MenuCategory[] = [
	{
		id: "burger",
		label: "Burgers",
		items: [
			{
				id: 1,
				name: "The 8oz",
				price: 16,
				image:
					"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
				description: "House beef patty, cheddar, lettuce, tomato and smoked sauce.",
				isPopular: true,
			},
			{
				id: 2,
				name: "The Classic",
				price: 17,
				image:
					"https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80",
				description: "Double cheese, pickles, caramelized onion and grill sauce.",
				isPopular: true,
			},
			{
				id: 3,
				name: "The Union",
				price: 18,
				image:
					"https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80",
				description: "Smash style beef burger with crispy onion and mustard mayo.",
			},
		],
	},
	{
		id: "fries",
		label: "Fries",
		items: [
			{
				id: 4,
				name: "Truffle Garlic Fries",
				price: 4,
				image:
					"https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=600&q=80",
				description: "Crispy potato fries with truffle oil, garlic and parmesan.",
				isPopular: true,
			},
			{
				id: 5,
				name: "Classic Fries",
				price: 3,
				image:
					"https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=600&q=80",
				description: "Golden fries with sea salt and house ketchup.",
			},
		],
	},
];

export const heroDish = {
	title: "My Burger Healthy Food",
	sizeOptions: ["small", "normal", "large"],
	price: 20,
	image:
		"https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=1200&q=80",
};

export const allMenuItems: MenuItem[] = menuCategories.flatMap(
	(category) => category.items
);

export function getMenuItemById(id: number): MenuItem | null {
	return allMenuItems.find((item) => item.id === id) ?? null;
}
