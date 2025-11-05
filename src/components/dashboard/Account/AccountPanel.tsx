// src/components/dashboard/Account/AccountPanel.tsx (updated)
interface AccountPanelProps {
  userData: any;
}

export default function AccountPanel({ userData }: AccountPanelProps) {
  const getUserInitials = () => {
    if (userData?.name) {
      return userData.name
        .split(' ')
        .map((word: string) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return userData?.email?.[0].toUpperCase() || 'U';
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text || text.length <= maxLength) return text || '';
    return text.substring(0, maxLength - 3) + '...';
  };

  return (
    <div className="flex items-center space-x-3 w-full min-w-0">
      <div className="w-8 md:w-10 h-8 md:h-10 bg-cyan-500 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
        <span className="text-white font-semibold text-xs md:text-sm">
          {getUserInitials()}
        </span>
      </div>
      <div className="flex flex-col space-y-1 min-w-0 flex-1 text-left">
        <p className="text-gray-800 font-semibold text-xs md:text-sm truncate text-left">
          {truncateText(userData?.name || 'User', 20)}
        </p>
        <p className="text-gray-500 text-xs truncate text-left break-all">
          {truncateText(userData?.email || 'user@example.com', 24)}
        </p>
      </div>
    </div>
  );
}