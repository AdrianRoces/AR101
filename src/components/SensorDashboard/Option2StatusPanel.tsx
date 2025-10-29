import React from 'react';
import type { ActivityEvent, SensorStatus } from './types';

interface Option2StatusPanelProps {
  activities: ActivityEvent[];
  sensors: SensorStatus[];
}

const Option2StatusPanel: React.FC<Option2StatusPanelProps> = ({ activities, sensors }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'success': return '🟢';
      case 'warning': return '🟡';
      case 'error': return '🔴';
      default: return '🔵';
    }
  };

  const getSensorIcon = (sensorName: string) => {
    if (sensorName.includes('Flame')) return '🔥';
    if (sensorName.includes('Temperature')) return '🌡️';
    if (sensorName.includes('Smoke')) return '💨';
    if (sensorName.includes('Gas')) return '⚠️';
    if (sensorName.includes('Motion')) return '👁️';
    return '📡';
  };

  return (
    <div className="p-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">System Overview</h1>
        <p className="text-gray-600">Comprehensive monitoring dashboard</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Status Overview */}
        <div className="xl:col-span-2 space-y-6">
          {/* Safety Status Banner */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">SYSTEM STATUS: SAFE</h2>
                <p className="text-green-100">All systems operating normally</p>
              </div>
              <div className="text-4xl">🛡️</div>
            </div>
          </div>

          {/* Critical Components Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gas Level Monitor */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-200 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">GAS LEVEL</h3>
                <div className="text-2xl">📊</div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">MQ2 Sensor</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium animate-pulse">
                    Normal
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-3/4 animate-pulse"></div>
                </div>
                <div className="text-sm text-gray-500">75% - Safe Level</div>
              </div>
            </div>

            {/* Flame Sensor */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-200 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">FLAME SENSOR</h3>
                <div className="text-2xl">🔥</div>
              </div>
              <div className="text-center py-4">
                <div className="text-4xl mb-2">✅</div>
                <div className="text-green-600 font-semibold text-lg">No Fire Detected</div>
              </div>
            </div>

            {/* Solenoid Valve */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-200 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">SOLENOID VALVE</h3>
                <div className="text-2xl">🔧</div>
              </div>
              <div className="text-center py-4">
                <div className="text-4xl mb-2 animate-bounce">🔓</div>
                <div className="text-blue-600 font-semibold text-lg">OPEN</div>
              </div>
            </div>

            {/* Water Spray */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">WATER SPRAY</h3>
                <div className="text-2xl">💧</div>
              </div>
              <div className="text-center py-4">
                <div className="text-4xl mb-2">⏸️</div>
                <div className="text-gray-600 font-semibold text-lg">IDLE</div>
              </div>
            </div>
          </div>

          {/* All Sensors Grid */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Sensor Network</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sensors.map((sensor, index) => (
                <div 
                  key={sensor.name}
                  className={`p-4 rounded-lg border-2 transform hover:scale-105 transition-all duration-300 ${getStatusColor(sensor.status)}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">{getSensorIcon(sensor.name)}</span>
                    <span className="font-medium text-sm">{sensor.name.split(' ')[0]}</span>
                  </div>
                  <div className="text-xs text-gray-600">{sensor.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Activity Timeline */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Activity Timeline</h3>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div 
                key={activity.id}
                className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50 border-l-4 border-blue-500 transform hover:translate-x-2 transition-transform duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="text-lg">{getEventIcon(activity.type)}</div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">{activity.message}</p>
                  <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Option2StatusPanel;