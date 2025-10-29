import React from 'react';
import type { ActivityEvent } from './types';

interface Option1CardLayoutProps {
  activities: ActivityEvent[];
}

const Option1CardLayout: React.FC<Option1CardLayoutProps> = ({ activities }) => {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">System Monitoring</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Status Cards */}
        <div className="space-y-6">
          {/* System Status */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 text-center">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">System Status</h2>
            <div className="text-4xl font-bold text-green-600">SAFE</div>
          </div>

          {/* Gas Level */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">GAS LEVEL (MQ2)</h2>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">000</div>
              <div className="text-sm text-gray-600">Normal Level</div>
            </div>
          </div>

          {/* Flame Sensor */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Flame Sensor Status</h2>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">No Fire</div>
              <div className="text-sm text-gray-600">All Clear</div>
            </div>
          </div>
        </div>

        {/* Right Column - Components & Activity */}
        <div className="space-y-6">
          {/* System Components */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">System Components</h2>
            <div className="space-y-4">
              {/* Solenoid Valve */}
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="font-medium text-gray-700">Solenoid Valve</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Open
                </span>
              </div>
              {/* Water Spray */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Water Spray</span>
                <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium">
                  Idle
                </span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Recent Activity</h2>
            <div className="space-y-3">
              {activities.map((activity) => (
                <div 
                  key={activity.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-gray-700">{activity.message}</span>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Option1CardLayout;