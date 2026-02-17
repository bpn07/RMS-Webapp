import { useState } from "react";
import { Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface WishlistDrawerProps {
  onClose: () => void;
}

// Define proper types for favourites
interface FavouriteItem {
  id: string;
  name: string;
  image?: string;
}

interface FavouritePlace {
  id: string;
  name: string;
  location?: string;
}

export default function WishlistDrawer({ onClose }: WishlistDrawerProps) {
  const [activeTab, setActiveTab] = useState<"items" | "places">("items");

  // Example data – replace with real state or API
  const favouriteItems: FavouriteItem[] = [];
  const favouritePlaces: FavouritePlace[] = [];

  const empty =
    activeTab === "items"
      ? favouriteItems.length === 0
      : favouritePlaces.length === 0;

  return (
    <aside className="fixed top-0 right-0 z-40 h-full w-full sm:w-100 bg-white shadow-xl animate-slideIn flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b">
        <h2 className="text-lg font-semibold">Your favourites</h2>
        <Button variant="ghost" onClick={onClose}>
          <X className="h-5 w-5 text-gray-500" />
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-4 py-3 border-b">
        {["items", "places"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as "items" | "places")}
            className={`
              flex-1 py-2 rounded-full text-sm font-medium
              ${
                activeTab === tab
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700"
              }
            `}
          >
            {tab === "items" ? "Items" : "Places"}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-6 overflow-y-auto">
        {empty ? (
          <div className="text-center mt-12 space-y-3">
            <Heart className="h-12 w-12 mx-auto text-gray-300" />
            <h3 className="font-semibold text-gray-800">No favourites added</h3>
            <p className="text-sm text-gray-500">
              Save your favourite {activeTab} to find them faster next time.
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-1 justify-center">
              Tap the <Heart className="h-4 w-4 text-gray-300" /> icon on a{" "}
              {activeTab === "items" ? "item" : "place"} to add it.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {activeTab === "items" &&
              favouriteItems.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  {item.image && (
                    <div className="relative w-12 h-12 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="rounded object-cover"
                      />
                    </div>
                  )}
                  <span>{item.name}</span>
                </li>
              ))}

            {activeTab === "places" &&
              favouritePlaces.map((place) => (
                <li key={place.id} className="flex flex-col">
                  <span className="font-medium">{place.name}</span>
                  {place.location && (
                    <span className="text-sm text-gray-500">
                      {place.location}
                    </span>
                  )}
                </li>
              ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
