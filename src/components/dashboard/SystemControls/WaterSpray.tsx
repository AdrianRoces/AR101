// src/components/dashboard/SystemControls/WaterSpray.tsx
interface WaterSprayProps {
  status: 'Active' | 'Idle' | 'Deactivated';
  manualMode: boolean;
  activeWaterSpray: boolean;
  onActiveWaterSprayToggle: () => void;
}

export default function WaterSpray({ status, manualMode, activeWaterSpray, onActiveWaterSprayToggle }: WaterSprayProps) {
  const statusConfig = {
    Active: 'text-blue-600',
    Idle: 'text-gray-600',
    Deactivated: 'text-red-600'
  };

  return (
    <div className="bg-white border rounded-br-3xl p-4 h-full flex flex-col shadow-inner shadow-gray-300">
      <h4 className="font-medium text-gray-700 text-center text-sm md:text-base">Water Spray</h4>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs md:text-sm text-gray-700 font-medium">Active Spray</span>
        <button
          onClick={onActiveWaterSprayToggle}
          disabled={!manualMode}
          className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors ${
            activeWaterSpray ? 'bg-blue-500' : 'bg-gray-300'
          } ${!manualMode ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform ${
            activeWaterSpray ? 'translate-x-5' : ''
          }`} />
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <img src="/images/spray.png" alt="Spray" className="w-12 h-12 md:w-16 md:h-16" />
      </div>
      <div className="flex justify-center">
        <span className={`text-lg md:text-xl font-semibold ${statusConfig[status]}`}>
          {status}
        </span>
      </div>
    </div>
  );
}