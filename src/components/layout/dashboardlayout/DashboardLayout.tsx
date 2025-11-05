// src/components/layout/dashboardlayout/DashboardLayout.tsx
import { useState } from 'react';
import AccountPanel from '../../dashboard/Account/AccountPanel';

interface DashboardLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
  onOpenSettings?: () => void;
  onOpenHistory?: () => void;
  onOpenAccount?: () => void;
  userData?: any;
}

export default function DashboardLayout({ 
  children, 
  onLogout, 
  onOpenSettings, 
  onOpenHistory, 
  onOpenAccount,
  userData 
}: DashboardLayoutProps) {
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAccountClick = () => {
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  const handleManageAccount = () => {
    setIsAccountDropdownOpen(false);
    onOpenAccount?.();
  };

  const handleLogout = () => {
    setIsAccountDropdownOpen(false);
    onLogout();
  };

  const menuItems = [
    {
      label: 'Settings',
      icon: '/src/assets/images/settings.png',
      onClick: onOpenSettings,
      hoverColor: 'hover:bg-teal-50'
    },
    {
      label: 'History',
      icon: '/src/assets/images/history.png',
      onClick: onOpenHistory,
      hoverColor: 'hover:bg-yellow-50'
    }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed top-5 left-5 bottom-6 w-64 bg-gray-50 rounded-3xl shadow-lg flex-col z-20">
        {/* Logo */}
        <div className="p-6 flex items-center space-x-3">
          <img src="/src/assets/images/logo.png" alt="Logo" className="h-10 w-10" />
          <h1 className="text-lg font-bold text-teal-600">SENTRI GAS</h1>
        </div>

        {/* Dashboard Title */}
        <div className="px-6 pb-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-500 uppercase tracking-wider">Dashboard</h2>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-1 px-4 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className={`flex items-center space-x-3 w-full ${item.hoverColor} rounded-lg p-3 transition-all duration-300 hover:translate-x-2 group`}
            >
              <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                <img src={item.icon} alt={item.label} className="w-5 h-5" />
              </div>
              <span className="text-base font-medium text-gray-700">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Account Section */}
        <div className="p-4 border-t border-gray-200 relative">
          <button
            onClick={handleAccountClick}
            className="flex items-center justify-between w-full hover:bg-gray-100 rounded-lg p-3 transition-colors group"
          >
            <AccountPanel userData={userData} />
            <svg 
              className={`w-4 h-4 text-gray-500 transition-transform ${isAccountDropdownOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Account Dropdown */}
          {isAccountDropdownOpen && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-30">
              <button
                onClick={handleManageAccount}
                className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Manage Account</span>
              </button>
              <div className="border-t border-gray-200" />
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Logout</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-gray-50 border-b border-gray-200 z-30">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <img src="/src/assets/images/logo.png" alt="Logo" className="h-8 w-8" />
            <h1 className="text-base font-bold text-teal-600">SENTRI GAS</h1>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-200 bg-white">
            <nav className="p-4 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    item.onClick?.();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <img src={item.icon} alt={item.label} className="w-5 h-5" />
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                </button>
              ))}
              <div className="border-t border-gray-200 my-2" />
              <button
                onClick={() => {
                  handleManageAccount();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <AccountPanel userData={userData} />
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50 rounded-lg transition-colors text-red-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="text-sm font-medium">Logout</span>
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 pt-20 md:pt-6 p-6">
        {children}
      </main>

      {/* Backdrop */}
      {(isAccountDropdownOpen || isMobileMenuOpen) && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setIsAccountDropdownOpen(false);
            setIsMobileMenuOpen(false);
          }}
        />
      )}
    </div>
  );
}