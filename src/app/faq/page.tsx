import Link from "next/link";

const faqSections = [
  {
    id: "about-us",
    title: "About Us",
    content: (
      <>
        <p>Hello My Name is Khan</p>
      </>
    ),
  },
  {
    id: "my-order",
    title: "My order",
    content: (
      <p>
        Information about managing and tracking your orders will be displayed
        here.
      </p>
    ),
  },

  {
    id: "payments-refunds",
    title: "Payments/refunds",
    content: (
      <p>
        Information regarding payment methods, billing, and our refund policy.
      </p>
    ),
  },
  {
    id: "food-safety",
    title: "Food Safety",
    content: (
      <p>
        Our commitment to food safety and how we work with partners to ensure
        high standards.
      </p>
    ),
  },
  {
    id: "rider-complaints",
    title: "Rider Complaints",
    content: (
      <p>How to report issues or provide feedback regarding delivery riders.</p>
    ),
  },
  {
    id: "anything-else",
    title: "Anything else?",
    content: (
      <p>
        Frequently asked questions about other topics not covered in the
        sections above.
      </p>
    ),
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <header className="relative bg-cyan-500 pt-16 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white max-w-4xl">
            Frequently asked questions
          </h1>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-gray-50 origin-bottom-left"
          style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
        />
      </header>

      <main className="container mx-auto px-4 -mt-16 relative pb-20">
        <div className="max-w-7xl mx-auto ">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-1/3 xl:w-1/4">
              <nav className=" bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
                <ul className="divide-y divide-gray-100">
                  {faqSections.map((section) => (
                    <li key={section.id}>
                      <Link
                        href={`#${section.id}`}
                        className="block px-6 py-4 hover:bg-gray-50 transition-colors font-medium leading-snug"
                      >
                        {section.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Content Area */}
            <div className="w-full lg:w-2/3 xl:w-3/4 space-y-8">
              {faqSections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="bg-white rounded-sm shadow-sm border border-gray-100 p-8 md:p-12 scroll-mt-20"
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    {section.title}
                  </h2>
                  <div className="prose prose-slate max-w-none text-gray-700 space-y-4 leading-relaxed">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
