// components/account/SocialAccounts.tsx
const accounts = ["Apple", "Amazon", "Facebook"];

export default function SocialAccounts() {
  return (
    <section className="border rounded-xl p-4 space-y-3 bg-white">
      <h2 className="text-xl font-semibold">Social accounts</h2>

      {accounts.map((name) => (
        <div
          key={name}
          className="flex justify-between items-center border rounded-lg p-4"
        >
          <span className="font-medium">{name}</span>
          <span className="text-sm text-gray-500">Not connected</span>
        </div>
      ))}
    </section>
  );
}
