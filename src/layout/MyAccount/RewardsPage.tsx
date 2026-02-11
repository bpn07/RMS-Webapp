import { Card } from "@/components/ui/card";

export default function RewardsTab() {
  const rewards = [
    { id: 1, name: "Welcome Bonus", points: 500, date: "Jan 15, 2025" },
    { id: 2, name: "Birthday Reward", points: 250, date: "Dec 20, 2024" },
    { id: 3, name: "Referral Bonus", points: 1000, date: "Nov 30, 2024" },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-linear-to-r from-cyan-50 to-blue-50">
        <h2 className="text-2xl font-semibold mb-2">Total Rewards Points</h2>
        <p className="text-4xl font-bold text-cyan-600">1,750 pts</p>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Reward History</h3>
        <div className="space-y-3">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div>
                <p className="font-medium text-gray-900">{reward.name}</p>
                <p className="text-sm text-gray-600">{reward.date}</p>
              </div>
              <p className="font-bold text-cyan-600">+{reward.points} pts</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
