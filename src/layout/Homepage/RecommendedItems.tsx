import { MenuItem } from "@/lib/restuarant-data";
import { MenuItemCard } from "./MenuItems";

interface RecommendedItemsProps {
    excludeIds: string[];
}

export const RecommendedItems = ({ excludeIds }: RecommendedItemsProps) => {
    const popularItems: MenuItem[] = [
        {
            id: "pop1",
            name: "Cheese Pizza",
            price: 8.99,
            description: "Delicious cheese pizza with fresh toppings",
            image: "/pizza.jpg",
        },
        {
            id: "pop2",
            name: "Veggie Burger",
            price: 6.5,
            description: "Healthy veggie burger with lettuce and tomato",
            image: "/burger.jpg",
        },
        {
            id: "pop3",
            name: "Chocolate Shake",
            price: 3.99,
            description: "Rich chocolate shake",
            image: "/shake.jpg",
        },
    ];

    const filteredItems = popularItems.filter((item) => !excludeIds.includes(item.id));

    if (filteredItems.length === 0) return null;

    return (
        <div className="mt-6">
            <h4 className="text-gray-700 font-semibold mb-3">Recommended for you</h4>
            <div className="flex flex-col gap-3">
                {filteredItems.map((item) => (
                    <MenuItemCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};