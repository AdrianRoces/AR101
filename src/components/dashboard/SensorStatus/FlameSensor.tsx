// src/components/dashboard/SensorStatus/FlameSensor.tsx
interface FlameSensorProps {
  detected: boolean;
}

export default function FlameSensor({ detected }: FlameSensorProps) {
  return (
    <div className="bg-white border rounded-tr-3xl p-4 h-full flex flex-col shadow-inner shadow-gray-300">
      <h4 className="font-medium text-gray-700 text-center text-sm md:text-base">Flame Sensor Status</h4>
      <div className="flex-1 flex items-center justify-center">
        <span className={`text-3xl md:text-4xl font-bold ${detected ? 'text-red-600' : 'text-yellow-500'}`}>
          {detected ? 'FIRE!' : 'SAFE'}
        </span>
      </div>
      <div className="h-10" />
    </div>
  );
}