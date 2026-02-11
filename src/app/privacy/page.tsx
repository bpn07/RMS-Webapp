"use client";

export default function PrivacyPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* FULL WIDTH INTRO */}
      <section className="w-full bg-cyan-500 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold">Privacy Policy</h1>
          <p className="mt-3 max-w-2xl opacity-90">
            Learn how we collect, use, and protect your personal information.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        <section className="bg-white rounded-xl shadow p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-semibold">Information We Collect</h2>

          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Name, date, time, and party size for reservations.</li>
            <li>Pre-order selections if enabled.</li>
            <li>Basic usage data for service improvement.</li>
          </ul>
        </section>

        <section className="bg-white rounded-xl shadow p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-semibold">How We Use Your Data</h2>

          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>To confirm and manage reservations.</li>
            <li>To prepare pre-ordered food in advance.</li>
            <li>To improve user experience and services.</li>
          </ul>
        </section>

        <section className="bg-white rounded-xl shadow p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-semibold">Data Protection</h2>

          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Your data is never sold to third parties.</li>
            <li>Industry-standard security practices are used.</li>
            <li>You may request data deletion at any time.</li>
          </ul>
        </section>

        <p className="text-xs text-center text-muted-foreground">
          Last updated: January 2026
        </p>
      </main>
    </div>
  );
}
