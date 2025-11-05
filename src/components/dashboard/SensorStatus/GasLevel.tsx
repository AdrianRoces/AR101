// src/components/dashboard/SensorStatus/GasLevel.tsx
interface GasLevelProps {
  level: number;
  status: 'SAFE' | 'WARNING' | 'DANGER';
}

export default function GasLevel({ level, status }: GasLevelProps) {
  const statusConfig = {
    SAFE: 'bg-green-500 text-white',
    WARNING: 'bg-yellow-500 text-white',
    DANGER: 'bg-red-500 text-white'
  };

  return (
    <div className="bg-white border rounded-tl-3xl p-4 h-full flex flex-col shadow-inner shadow-gray-300">
      <h4 className="font-medium text-gray-700 text-center text-sm md:text-base">GAS LEVEL (MQ2)</h4>
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl md:text-4xl font-bold text-teal-500">{level}</span>
          <span className="text-base md:text-lg text-gray-600">ppm</span>
        </div>
      </div>
      <div className="flex justify-center">
        <div className={`px-4 md:px-6 py-2 rounded-full ${statusConfig[status]} font-semibold text-sm`}>
          {status}
        </div>
      </div>
    </div>
  );
}