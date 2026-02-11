import Image from "next/image";

interface RestaurantHeroProps {
  imageUrl: string;
  altText: string;
}

export function RestaurantHero({ altText }: RestaurantHeroProps) {
  return (
    <div className="relative h-80 w-full overflow-hidden rounded-lg">
      <Image
        src={"/food.jpg"}
        alt={altText}
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
