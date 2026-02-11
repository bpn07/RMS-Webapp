import { Card } from "@/components/ui/card";

export default function AccountDetailsTab() {
  const isVerified = true;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Account Details</h2>

        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-10">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* Email */}
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                readOnly
              />
              <div className="flex italic  items-center">
                To change your email, please contact support.
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Date of Birth
              </label>
              <input
                id="dob"
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <div className="flex italic  items-center">
                To change your email, please contact support.
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                defaultValue="+977 9812345678"
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                readOnly
              />

              <div className="flex items-center justify-between mt-2">
                <a
                  href="/phoneverification"
                  className="underline text-cyan-500"
                >
                  Edit
                </a>
                {/* Verification Status */}
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    isVerified
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {isVerified ? "Verifed" : "Not Verified"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
