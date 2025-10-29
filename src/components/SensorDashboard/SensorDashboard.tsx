import React, { useState } from 'react';
import Option1CardLayout from './Option1CardLayout';
import Option2StatusPanel from './Option2StatusPanel';
import Option3ModernDashboard from './Option3ModernDashboard';
import type { ActivityEvent } from './types';

interface SensorDashboardProps {
  onLogout: () => void;
}

const SensorDashboard: React.FC<SensorDashboardProps> = ({ onLogout }) => {
  const [currentView, setCurrentView] = useState<'option1' | 'option2' | 'option3'>('option1');

  // Simplified activities data matching the image
  const activities: ActivityEvent[] = [
    { id: '1', message: 'Gas Valve Opened', time: '[11:05 PM]', type: 'info' },
    { id: '2', message: 'Water Spray Deactivated', time: '[11:05 PM]', type: 'info' },
    { id: '3', message: 'System Reset Initiated', time: '[11:05 PM]', type: 'success' },
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'option1':
        return <Option1CardLayout activities={activities} />;
      case 'option2':
        return <Option2StatusPanel activities={activities} sensors={[]} />;
      case 'option3':
        return <Option3ModernDashboard activities={activities} />;
      default:
        return <Option1CardLayout activities={activities} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Unchanged */}
      <div className="w-64 bg-white shadow-xl">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-800 mb-8">SENTRI GAS</h1>
          
          <nav className="space-y-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Monitoring
            </div>
            <button 
              onClick={() => setCurrentView('option1')}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentView === 'option1' 
                  ? 'bg-teal-50 text-teal-600 shadow-sm' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Sensors
            </button>
            <button 
              onClick={() => setCurrentView('option2')}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentView === 'option2' 
                  ? 'bg-teal-50 text-teal-600 shadow-sm' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              System Components
            </button>
            <button 
              onClick={() => setCurrentView('option3')}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentView === 'option3' 
                  ? 'bg-teal-50 text-teal-600 shadow-sm' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Status Overview
            </button>
            
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-6">
              System
            </div>
            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-300">
              Settings
            </button>
            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-300">
              History
            </button>
            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-300">
              Account
            </button>
            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-300">
              Alerts & Notifications
            </button>
            
            <div className="pt-4 mt-4 border-t border-gray-200">
              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default SensorDashboard;