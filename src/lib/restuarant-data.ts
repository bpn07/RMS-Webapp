export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  popular?: boolean;
  badge?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
  quantity?: number;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  icon: string;
  popupKey?: string;
}

export interface RestaurantData {
  name: string;
  location: string;
  rating: {
    score: number;
    label: string;
    count: string;
  };
  delivery: {
    time: string;
    distance: string;
    fee: number;
    minimum: number;
  };
  heroImage: string;
  categories: MenuCategory[];

  promotions: Promotion[];
}

export const restaurantData: RestaurantData = {
  name: "Kathmandu Kitchen",

  location: "Bhaktapur",

  rating: {
    score: 4.1,
    label: "Good",
    count: "500+",
  },

  delivery: {
    time: "around 50 min",
    distance: "4.90 mi",
    fee: 7.99,
    minimum: 15.0,
  },

  heroImage: "/images/image.png",

  promotions: [
    {
      id: "promo-20-off",
      title: "20% off entire menu",
      description:
        "For orders over £20, excluding alcohol. T&Cs apply\nNew customers only",
      icon: "🎟️",
      popupKey: "menu-discount",
    },
    {
      id: "promo-delivery-info",
      title: "Delivered by Kathmandu",
      description:
        "This means you won't be able to follow your order or get live updates",
      icon: "🚫",
      popupKey: "delivery-info",
    },
    {
      id: "promo-bank-offer",
      title: "10% Bank Offer",
      description: "Pay using XYZ Bank cards",
      icon: "🏦",
      popupKey: "bank-offer",
    },
    {
      id: "promo-bank-offeer",
      title: "10% Bank Offer",
      description: "Pay using XYZ Bank cards",
      icon: "🏦",
      popupKey: "bank-offer",
    },
  ],

  categories: [
    {
      id: "create-your-own-box",
      name: "Create Your Own Box",
      items: [
        {
          id: "cyob-large",
          name: "Create Your Own - Large",
          description: "3 easy steps to a perfect box",
          price: 9.75,
          image: "/food.jpg",
          badge: "Popular",
        },
        {
          id: "cyob-regular",
          name: "Create Your Own - Regular",
          description: "3 easy steps to a perfect box",
          price: 7.75,
          image: "/food.jpg",
          badge: "Popular",
        },
        {
          id: "cyob-value",
          name: "Create Your Own - Value",
          description: "3 easy steps to a perfect box",
          price: 6.75,
          image: "/food.jpg",
        },
      ],
    },
    {
      id: "popular-with-others",
      name: "Popular with other people",
      items: [
        {
          id: "cyob-large-pop",
          name: "Create Your Own - Large",
          price: 9.75,
          image: "/food.jpg",
          popular: true,
        },
        {
          id: "cyob-regular-pop",
          name: "Create Your Own - Regular",
          price: 7.75,
          image: "/food.jpg",
          popular: true,
        },
        {
          id: "cyob-value-pop",
          name: "Create Your Own - Value",
          price: 6.75,
          image: "/food.jpg",
          popular: true,
        },
        {
          id: "salt-pepper",
          name: "4 x Salt & Pepper...",
          price: 5.99,
          image: "/food.jpg",
          popular: true,
        },
        {
          id: "ice-blast",
          name: "Large Ice Blast",
          price: 5.99,
          image: "/food.jpg",
          popular: true,
        },
        {
          id: "caramel-chicken",
          name: "Caramel Chicken",
          price: 9.25,
          image: "/food.jpg",
          popular: true,
        },
        {
          id: "manchurian-chicken",
          name: "Manchurian Chicken",
          price: 9.25,
          image: "/food.jpg",
          popular: true,
        },
        {
          id: "jumbo-roll",
          name: "2 x Jumbo Chicken Roll",
          price: 7.49,
          image: "/food.jpg",
          popular: true,
        },
        {
          id: "crispy-chicken",
          name: "Oodles Crispy Chicken",
          price: 9.25,
          image: "/food.jpg",
          popular: true,
        },
      ],
    },
    {
      id: "popular-boxes-dry",
      name: "Popular Boxes Dry",
      items: [
        {
          id: "dry-spicy-box",
          name: "Spicy Dragon Box",
          description: "Spicy chicken with egg fried rice",
          price: 8.95,
          image: "/food.jpg",
        },
        {
          id: "dry-honey-box",
          name: "Honey Sesame Box",
          description: "Honey sesame chicken with rice",
          price: 8.95,
          image: "/food.jpg",
        },
      ],
    },
    {
      id: "popular-boxes-saucy",
      name: "Popular Boxes Saucy",
      items: [
        {
          id: "saucy-teriyaki",
          name: "Teriyaki Chicken Box",
          description: "Chicken in teriyaki sauce with noodles",
          price: 8.95,
          image: "/food.jpg",
        },
        {
          id: "saucy-sweet-sour",
          name: "Sweet & Sour Box",
          description: "Sweet and sour chicken with rice",
          price: 8.95,
          image: "/food.jpg",
        },
      ],
    },
    {
      id: "wok-wings",
      name: "Wok Wings",
      items: [
        {
          id: "wings-bbq",
          name: "BBQ Wings",
          description: "6 pieces",
          price: 5.99,
          image: "/food.jpg",
        },
        {
          id: "wings-buffalo",
          name: "Buffalo Wings",
          description: "6 pieces",
          price: 5.99,
          image: "/food.jpg",
        },
      ],
    },
    {
      id: "wraps",
      name: "Wraps",
      items: [
        {
          id: "wrap-chicken",
          name: "Chicken Wrap",
          description: "Grilled chicken with fresh vegetables",
          price: 6.49,
          image: "/food.jpg",
        },
      ],
    },
    {
      id: "kids-box",
      name: "Kids Box",
      items: [
        {
          id: "kids-nuggets",
          name: "Chicken Nuggets Box",
          description: "With fries and juice",
          price: 4.99,
          image: "/food.jpg",
        },
      ],
    },
    {
      id: "sides",
      name: "Sides",
      items: [
        {
          id: "side-fries",
          name: "Fries",
          price: 2.99,
          image: "/food.jpg",
        },
        {
          id: "side-rice",
          name: "Egg Fried Rice",
          price: 3.49,
          image: "/food.jpg",
        },
      ],
    },
    {
      id: "soft-drinks",
      name: "Soft Drinks",
      items: [
        {
          id: "drink-coke",
          name: "Coca-Cola",
          description: "330ml can",
          price: 1.99,
          image: "/food.jpg",
        },
      ],
    },
    {
      id: "desserts",
      name: "Desserts",
      items: [
        {
          id: "dessert-brownie",
          name: "Chocolate Brownie",
          price: 3.99,
          image: "/food.jpg",
        },
      ],
    },
    {
      id: "snacks",
      name: "Snacks",
      items: [
        {
          id: "snack-spring-rolls",
          name: "Vegetable Spring Rolls",
          description: "4 pieces",
          price: 3.49,
          image: "/food.jpg",
        },
      ],
    },
    {
      id: "tango-ice-blast",
      name: "Tango Ice Blast",
      items: [
        {
          id: "tango-large",
          name: "Large Tango Ice Blast",
          price: 5.99,
          image: "/food.jpg",
        },
        {
          id: "tango-regular",
          name: "Regular Tango Ice Blast",
          price: 4.49,
          image: "/food.jpg",
        },
      ],
    },
  ],
};
