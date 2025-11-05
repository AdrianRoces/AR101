// src/components/dashboard/SensorStatus/SensorStatus.tsx
import type { SensorData } from '../../../types/dashboard';
import GasLevel from './GasLevel';
import FlameSensor from './FlameSensor';

interface SensorStatusProps {
  data: SensorData;
}

export default function SensorStatus({ data }: SensorStatusProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 md:p-6 w-full md:w-[600px] shadow-lg">
      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 text-center">SENSORS</h3>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="w-full md:w-56 h-48 md:h-52">
          <GasLevel level={data.gasLevel} status={data.gasStatus} />
        </div>
        <div className="w-full md:w-56 h-48 md:h-52">
          <FlameSensor detected={data.flameDetected} />
        </div>
      </div>
    </div>
  );
}
