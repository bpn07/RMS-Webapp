"use client";

interface ProfileHeaderProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  tabs: Array<{ id: string; label: string }>;
}

export default function ProfileHeader({
  activeTab,
  onTabChange,
  tabs,
}: ProfileHeaderProps) {
  return (
    <header className="bg-primary text-white">
      {/* Profile Info */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-4 sm:pt-8 sm:pb-6">
        <h1 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">Don Dai</h1>
        <p className="text-cyan-100 text-sm sm:text-base">dondai1@gmail.com</p>
      </div>

      {/* Tabs */}
      <div>
        <nav className="max-w-7xl mx-auto  flex gap-2 overflow-x-auto no-scrollbar px-4 py-3 sm:px-6 ">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`shrink-0 px-4 rounded-full text-sm sm:text-base font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-white text-primary shadow"
                  : "text-white/90 hover:text-white hover:bg-muted-foreground"
              }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
