"use client";

export default function TermsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* FULL WIDTH INTRO */}
      <section className="w-full bg-cyan-500 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold">Terms & Conditions</h1>
          <p className="mt-3 max-w-2xl opacity-90">
            These terms govern your use of our services and reservations.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        <section className="bg-white rounded-xl shadow p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-semibold">General Terms</h2>

          <p className="text-sm text-muted-foreground">
            By using our website or making a reservation, you agree to the
            following terms and conditions.
          </p>

          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>All reservations are subject to availability.</li>
            <li>
              Pre-orders must be confirmed before completing reservations.
            </li>
            <li>Menu items and prices may change without notice.</li>
            <li>
              Late arrivals may result in cancellation of your reservation.
            </li>
            <li>We reserve the right to refuse service in case of misuse.</li>
          </ul>
        </section>

        <section className="bg-white rounded-xl shadow p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-semibold">Payments & Cancellations</h2>

          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>No payment is required unless stated explicitly.</li>
            <li>Cancellations must be made at least 2 hours in advance.</li>
            <li>Failure to cancel may result in restricted future bookings.</li>
          </ul>
        </section>

        <p className="text-xs text-center text-muted-foreground">
          Last updated: January 2026
        </p>
      </main>
    </div>
  );
}
