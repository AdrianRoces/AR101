interface SolenoidValveProps {
  status: 'Open' | 'Closed';
  manualMode: boolean;
  openGas: boolean;
  onOpenGasToggle: () => void;
}

export default function SolenoidValve({ 
  status, 
  manualMode, 
  openGas, 
  onOpenGasToggle 
}: SolenoidValveProps) {
  return (
    <div className="bg-white border-[1px] rounded-bl-[25px] p-4 h-full flex flex-col shadow-inner shadow-gray-400">
      {/* Label at the top - centered */}
      <h4 className="font-medium text-gray-700 text-center">Solenoid Valve</h4>
      
      {/* Open Gas Control */}
      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm text-gray-700 font-medium">Open Gas</span>
        <button
          onClick={onOpenGasToggle}
          disabled={!manualMode}
          className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors ${
            openGas ? 'bg-blue-500' : 'bg-gray-300'
          } ${!manualMode ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div
            className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform ${
              openGas ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
      
      {/* Icon centered in the middle */}
      <div className="flex-1 flex items-center justify-center">
        <img 
          src="/images/valve.png" 
          alt="Solenoid Valve" 
          className="w-16 h-16 object-contain"
        />
      </div>
      
      {/* Status centered at the bottom */}
      <div className="flex justify-center">
        <span className={`text-xl font-semibold ${
          status === 'Open' ? 'text-green-600' : 'text-red-600'
        }`}>
          {status}
        </span>
      </div>
    </div>
  );
}