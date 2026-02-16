import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";

const orders = [
  {
    id: "ORD-7234",
    restaurant: "Burger & Lobster",
    date: "24 Dec 2025, 19:30",
    status: "Delivered",
    total: "£42.50",
    items: "2x Original Lobster Roll, 1x Truffle Fries",
    image: "/burger-lobster.jpg",
  },
  {
    id: "ORD-6192",
    restaurant: "Sushi Gourmet",
    date: "18 Dec 2025, 13:15",
    status: "Delivered",
    total: "£28.00",
    items: "1x Salmon Sashimi Set, 1x Miso Soup",
    image: "/assorted-sushi-platter.png",
  },
];

// const orders = [];

export default function OrderHistoryPage() {
  const hasOrders = orders.length > 0;

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero */}
      <header className="bg-cyan-500 py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Orders
          </h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 -mt-16s py-20">
        {hasOrders ? (
          <div className="bg-white rounded-sm shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Past orders
            </h2>

            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col md:flex-row gap-6 p-6 border border-gray-100 rounded-sm hover:border-deliveroo-teal/30 hover:shadow-md transition-all group"
                >
                  <div className="w-20 h-20 bg-gray-100 rounded-sm overflow-hidden shrink-0">
                    <Image
                      src={order.image || "/placeholder.svg"}
                      alt={order.restaurant}
                      width={80}
                      height={80}
                      className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-deliveroo-teal transition-colors">
                          {order.restaurant}
                        </h3>
                        <p className="text-sm text-gray-500 font-medium">
                          {order.date}
                        </p>
                      </div>

                      <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                        {order.status}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-1">
                      {order.items}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <span className="font-bold text-gray-900">
                        {order.total}
                      </span>

                      <div className="flex gap-3">
                        <button className="text-deliveroo-teal text-sm font-bold hover:underline cursor-pointer">
                          View receipt
                        </button>
                        <button className="bg-deliveroo-teal text-white px-4 py-2 rounded-sm text-sm font-bold hover:bg-deliveroo-dark-teal transition-colors">
                          Reorder
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-sm shadow-sm border border-gray-100 p-12 md:p-20 text-center">
            <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="w-12 h-12 text-deliveroo-teal" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              You haven’t placed any orders yet
            </h2>

            <p className="text-gray-600 mb-10 max-w-md mx-auto">
              Hungry? Browse restaurants near you and we’ll bring it straight to
              your door.
            </p>

            <Link
              href="/"
              className="inline-block bg-deliveroo-teal text-white px-10 py-4 rounded-sm font-bold text-lg hover:bg-deliveroo-dark-teal transition-all"
            >
              Start ordering
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
