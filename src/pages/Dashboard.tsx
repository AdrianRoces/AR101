// src/pages/Dashboard.tsx (updated)
import { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/dashboardlayout/DashboardLayout';
import type { DashboardData } from '../types/dashboard';
import SensorStatus from '../components/dashboard/SensorStatus/SensorStatus';
import NotificationsPanel from '../components/dashboard/Notifications/NotificationsPanel';
import SystemControls from '../components/dashboard/SystemControls/SystemControls';
import Battery from '../components/dashboard/Battery/Battery';
import SettingsPopup from '../components/dashboard/popups/SettingsPopup';
import HistoryPopup from '../components/dashboard/popups/HistoryPopup';
import AccountPopup from '../components/dashboard/popups/AccountPopup';

interface DashboardProps {
  userData: any;
  onLogout: () => void;
}

const INITIAL_DASHBOARD_DATA: DashboardData = {
  sensors: {
    gasLevel: 45,
    gasStatus: 'SAFE',
    flameDetected: false
  },
  notifications: [
    {
      id: '1',
      timestamp: new Date('2024-01-15T13:05:00'),
      message: 'Gas Valve Opened.',
      type: 'info'
    },
    {
      id: '2',
      timestamp: new Date('2024-01-15T13:05:00'),
      message: 'Water Spray Deactivated.',
      type: 'info'
    },
    {
      id: '3',
      timestamp: new Date('2024-01-15T13:05:00'),
      message: 'System Reset Initiated.',
      type: 'info'
    }
  ],
  systemStatus: {
    solenoidValve: 'Open',
    waterSpray: 'Idle'
  },
  battery: {
    level: 85,
    voltage: 4.15,
    status: 'DISCHARGING' as const
  }
};

export default function Dashboard({ userData: initialUserData, onLogout }: DashboardProps) {
  const [dashboardData] = useState<DashboardData>(INITIAL_DASHBOARD_DATA);
  const [showSettings, setShowSettings] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [userData, setUserData] = useState(initialUserData);

  useEffect(() => {
    const interval = setInterval(() => {
      // Add real-time data updates here
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleUserDataUpdate = (updatedUserData: any) => {
    setUserData(updatedUserData);
  };

  return (
    <>
      <DashboardLayout 
        userData={userData}
        onLogout={onLogout}
        onOpenSettings={() => setShowSettings(true)}
        onOpenHistory={() => setShowHistory(true)}
        onOpenAccount={() => setShowAccount(true)}
      >
        <div className="w-full max-w-6xl mx-auto">
          {/* Desktop Layout - Two Columns */}
          <div className="hidden md:flex gap-6">
            {/* Left Column */}
            <div className="flex flex-col gap-6">
              <SensorStatus data={dashboardData.sensors} />
              <SystemControls status={dashboardData.systemStatus} />
            </div>
            
            {/* Right Column */}
            <div className="flex flex-col gap-6">
              <Battery 
                level={dashboardData.battery.level}
                voltage={dashboardData.battery.voltage}
                status={dashboardData.battery.status}
              />
              <NotificationsPanel notifications={dashboardData.notifications} />
            </div>
          </div>

          {/* Mobile Layout - Single Column Vertical Scroll */}
          <div className="md:hidden flex flex-col gap-6">
            <Battery 
              level={dashboardData.battery.level}
              voltage={dashboardData.battery.voltage}
              status={dashboardData.battery.status}
            />
            <SensorStatus data={dashboardData.sensors} />
            <SystemControls status={dashboardData.systemStatus} />
            <NotificationsPanel notifications={dashboardData.notifications} />
          </div>
        </div>
      </DashboardLayout>

      {/* Popups */}
      <SettingsPopup isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <HistoryPopup isOpen={showHistory} onClose={() => setShowHistory(false)} />
      <AccountPopup 
        isOpen={showAccount} 
        onClose={() => setShowAccount(false)} 
        userData={userData}
        onUserDataUpdate={handleUserDataUpdate}
      />
    </>
  );
}