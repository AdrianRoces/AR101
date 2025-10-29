import React from 'react';
import type { ActivityEvent } from './types';

interface Option3ModernDashboardProps {
  activities: ActivityEvent[];
}

const Option3ModernDashboard: React.FC<Option3ModernDashboardProps> = ({ activities }) => {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Safety Monitor</h1>
        <p className="text-gray-600">Real-time system status</p>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-4xl mx-auto">
        {/* Safety Status Banner */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-8 text-center mb-8 shadow-lg">
          <div className="text-5xl font-bold mb-2">SAFE</div>
          <p className="text-green-100 text-lg">All systems operational</p>
        </div>

        {/* Monitoring Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Gas Level Monitor */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">GAS LEVEL (MQ2)</h3>
            <div className="text-4xl font-bold text-blue-600 mb-2">000</div>
            <div className="text-sm text-gray-600">Safe Reading</div>
          </div>

          {/* Flame Sensor */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">FLAME SENSOR</h3>
            <div className="text-2xl font-bold text-green-600 mb-2">No Fire</div>
            <div className="text-sm text-gray-600">Status: Normal</div>
          </div>
        </div>

        {/* System Components */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">System Components</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-lg font-medium text-gray-800 mb-2">Solenoid Valve</div>
              <div className="text-green-600 font-semibold">Open</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-lg font-medium text-gray-800 mb-2">Water Spray</div>
              <div className="text-gray-600 font-semibold">Idle</div>
            </div>
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Recent Activity</h3>
          <div className="space-y-3">
            {activities.map((activity) => (
              <div 
                key={activity.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500"
              >
                <span className="text-gray-700">{activity.message}</span>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Option3ModernDashboard;