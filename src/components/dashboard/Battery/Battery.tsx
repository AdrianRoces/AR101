// src/components/dashboard/Battery/Battery.tsx
interface BatteryProps {
  level: number;
  voltage: number;
  status: 'CHARGING' | 'DISCHARGING' | 'FULL' | 'LOW';
}

export default function Battery({ level, voltage, status }: BatteryProps) {
  const levelColor = level >= 70 ? 'bg-green-500' : level >= 30 ? 'bg-yellow-500' : 'bg-red-500';
  const percentColor = level >= 70 ? 'text-green-600' : level >= 30 ? 'text-yellow-600' : 'text-red-600';
  
  const statusColors = {
    CHARGING: 'text-blue-600',
    DISCHARGING: 'text-gray-600',
    FULL: 'text-green-600',
    LOW: 'text-red-600'
  };

  return (
    <div className="bg-gray-50 rounded-xl p-4 md:p-6 shadow-lg w-full md:w-[400px] min-h-[180px] md:h-[220px]">
      <div className="flex flex-row justify-between items-start gap-4">
        <div className="w-auto">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Battery</h3>
          <div className="flex flex-col">
            <div className="flex items-baseline space-x-2">
              <span className={`text-4xl md:text-5xl font-bold ${percentColor}`}>{level}%</span>
              <span className="text-sm text-gray-500">{voltage}V</span>
            </div>
            <span className={`text-xs md:text-sm font-medium ${statusColors[status]} mt-1`}>
              {status}
            </span>
          </div>
        </div>

        {/* Battery Visual */}
        <div className="bg-white rounded-lg px-8 md:px-12 py-4 md:py-5 shadow-inner shadow-gray-300">
          <div className="flex flex-col items-center">
            <div className="relative w-12 md:w-16 h-20 md:h-28 border-2 border-gray-400 rounded-lg p-1">
              <div 
                className={`absolute bottom-1 left-1 right-1 rounded transition-all duration-300 ${levelColor}`}
                style={{ height: `${level}%` }}
              />
              <div className="absolute -top-2 md:-top-3 left-1/2 transform -translate-x-1/2 w-3 md:w-4 h-2 md:h-3 bg-gray-400 rounded-t" />
            </div>
            <span className="text-xs text-gray-500 mt-2 font-medium">{level}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

