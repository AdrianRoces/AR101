// src/components/dashboard/Account/AccountPanel.tsx
interface AccountPanelProps {
  userData: any;
}

export default function AccountPanel({ userData }: AccountPanelProps) {
  const getUserInitials = () => {
    if (userData?.displayName) {
      return userData.displayName
        .split(" ")
        .map((w: string) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return userData?.email?.charAt(0).toUpperCase() || "U";
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text || text.length <= maxLength) return text || "";
    return text.substring(0, maxLength - 3) + "...";
  };

  return (
    <div className="w-full">
      <div className="flex items-center space-x-3">

        {/* Avatar */}
        <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center shadow-md">
          <span className="text-white font-semibold text-sm">
            {getUserInitials()}
          </span>
        </div>

        {/* Name + Email */}
        <div className="flex flex-col min-w-0">
          <p className="text-gray-800 font-semibold text-sm truncate">
            {truncateText(userData?.displayName || "User", 20)}
          </p>
          <p className="text-gray-500 text-xs truncate">
            {truncateText(userData?.email || "no-email", 24)}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-4 h-px bg-gray-200"></div>

      {/* Additional Account UI can go here */}
      <div className="mt-4 text-xs text-gray-600">
        <p>User ID: {userData?.uid}</p>
      </div>
    </div>
  );
}
