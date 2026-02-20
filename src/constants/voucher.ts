import { StaticImageData } from "next/image";
export interface Voucher {
  id: string;
  name: string;
  description: string;
  minAmount: number;
  image?: StaticImageData;
  longDescription: string[];
}

const vouchers: Voucher[] = [
  {
    id: "dine",
    name: "Dine & Experience",
    description: "Perfect for culinary adventures.",
    minAmount: 25,
    // image: img,
    longDescription: [
      "Our Dine & Experience voucher offers a curated dining journey crafted to deliver an exceptional culinary escape. Whether it's a casual lunch or a lavish dinner, this voucher provides the flexibility to enjoy a variety of dishes prepared with the freshest seasonal ingredients.",
      "Guests can immerse themselves in a warm ambiance while exploring diverse flavors presented with artistic finesse. Perfect for celebrating small moments, reconnecting with loved ones, or surprising someone with a thoughtful gesture.",
      "This experience ensures a delightful balance of taste, presentation, and hospitality—making every visit memorable and uniquely enjoyable.",
    ],
  },
  {
    id: "tasting",
    name: "Tasting Menu",
    description: "Explore our chef's selections.",
    minAmount: 50,
    // image: img,
    longDescription: [
      "The Tasting Menu voucher unlocks an immersive multi-course journey designed by our head chef. Each dish is thoughtfully curated to highlight a harmonious blend of textures, flavors, and seasonal inspirations.",
      "Ideal for food lovers seeking a deeper appreciation of culinary craftsmanship, this voucher offers a structured and elegant dining experience.",
      "From amuse-bouche to dessert, every course reflects artistic mastery that transforms dining into a memorable story.",
    ],
  },
  {
    id: "celebration",
    name: "Celebration Bundle",
    description: "Make moments unforgettable.",
    minAmount: 75,
    // image: img,
    longDescription: [
      "Our Celebration Bundle voucher is crafted for birthdays, anniversaries, achievements, and cherished milestones. It includes a delightful combination of signature dishes, curated beverages, and optional upgrades to elevate the moment.",
      "Guests will enjoy a festive ambiance complemented by warm hospitality—ensuring every celebration feels personal and unforgettable.",
      "Whether surprising someone special or marking an important occasion, this package offers everything needed to create joyful and lasting memories.",
    ],
  },
  {
    id: "exclusive",
    name: "Exclusive Reserve",
    description: "Premium dining experience.",
    minAmount: 100,
    // image: img,
    longDescription: [
      "The Exclusive Reserve voucher offers an elite dining experience tailored for those who appreciate luxury and exclusivity. Expect premium ingredients, bespoke plating, and a curated ambiance that sets the stage for an extraordinary meal.",
      "This voucher is perfect for intimate celebrations, corporate gifting, or indulging in a refined culinary escape. Guests may enjoy priority seating, exclusive chef specials, and optional wine pairings.",
      "Every detail of this package is designed to deliver exceptional quality, sophistication, and impeccable service.",
    ],
  },
];

export default vouchers;
