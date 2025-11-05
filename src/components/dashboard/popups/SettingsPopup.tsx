// src/components/dashboard/popups/SettingsPopup.tsx
import { useState } from 'react';

interface SettingsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsPopup({ isOpen, onClose }: SettingsPopupProps) {
  const [gasThreshold, setGasThreshold] = useState('653');
  const [flameSensitivity, setFlameSensitivity] = useState(653);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md md:max-w-lg p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Settings</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div>
          <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4">Sensor Configuration</h3>
          <div className="bg-gray-50 rounded-xl p-4 md:p-6 shadow-inner shadow-gray-300 space-y-4 md:space-y-6">
            <div>
              <label className="block text-sm md:text-base text-gray-700 font-medium mb-2 md:mb-3">
                Gas Threshold (ppm)
              </label>
              <input
                type="text"
                value={gasThreshold}
                onChange={(e) => setGasThreshold(e.target.value)}
                className="w-full px-3 md:px-4 py-2 md:py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              />
            </div>

            <div>
              <label className="block text-sm md:text-base text-gray-700 font-medium mb-2 md:mb-3">
                Flame Sensitivity
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={flameSensitivity}
                  onChange={(e) => setFlameSensitivity(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${(flameSensitivity / 1000) * 100}%, #e5e7eb ${(flameSensitivity / 1000) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <div className="text-right text-xs md:text-sm text-gray-500">
                  {flameSensitivity} ppm
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

