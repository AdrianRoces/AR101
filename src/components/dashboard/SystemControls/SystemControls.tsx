// src/components/dashboard/SystemControls/SystemControls.tsx
import { useState } from 'react';
import type { SystemStatus } from '../../../types/dashboard';
import SolenoidValve from './SolenoidValve';
import WaterSpray from './WaterSpray';

interface SystemControlsProps {
  status: SystemStatus;
}

export default function SystemControls({ status }: SystemControlsProps) {
  const [manualMode, setManualMode] = useState(false);
  const [openGas, setOpenGas] = useState(false);
  const [activeWaterSpray, setActiveWaterSpray] = useState(false);

  return (
    <div className="bg-gray-50 rounded-xl p-4 md:p-6 w-full md:w-[600px] shadow-lg">
      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 text-center">SYSTEM COMPONENTS</h3>
      
      {/* Manual Mode Toggle */}
      <div className="flex justify-center mb-4">
        <div className="bg-white border rounded-lg p-3 md:p-4 flex items-center justify-between w-full md:w-96 shadow-inner shadow-gray-300">
          <span className="text-gray-700 font-medium text-sm md:text-base">Manual Mode</span>
          <button
            onClick={() => setManualMode(!manualMode)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
              manualMode ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          >
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
              manualMode ? 'translate-x-6' : ''
            }`} />
          </button>
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="w-full md:w-56 h-48 md:h-52">
          <SolenoidValve 
            status={status.solenoidValve} 
            manualMode={manualMode}
            openGas={openGas}
            onOpenGasToggle={() => manualMode && setOpenGas(!openGas)}
          />
        </div>
        <div className="w-full md:w-56 h-48 md:h-52">
          <WaterSpray 
            status={status.waterSpray} 
            manualMode={manualMode}
            activeWaterSpray={activeWaterSpray}
            onActiveWaterSprayToggle={() => manualMode && setActiveWaterSpray(!activeWaterSpray)}
          />
        </div>
      </div>
    </div>
  );
}