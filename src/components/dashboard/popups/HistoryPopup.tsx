// src/components/dashboard/popups/HistoryPopup.tsx
import { useState } from 'react';

interface HistoryPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface HistoryEvent {
  id: string;
  timestamp: Date;
  message: string;
  type: 'info' | 'warning' | 'danger';
}

const mockHistory: HistoryEvent[] = [
  {
    id: '1',
    timestamp: new Date('2024-01-15T10:30:00'),
    message: 'Water spray activated manually.',
    type: 'info'
  },
  {
    id: '2',
    timestamp: new Date('2024-01-15T10:30:00'),
    message: 'System Reset initiated.',
    type: 'info'
  },
  {
    id: '3',
    timestamp: new Date('2024-01-15T10:30:00'),
    message: 'Gas level exceeded danger threshold.',
    type: 'danger'
  }
];

const getEventIcon = (type: string) => {
  const icons = { warning: '⚠️', danger: '🔴', info: 'ℹ️' };
  return icons[type as keyof typeof icons] || 'ℹ️';
};

const getEventColor = (type: string) => {
  const colors = { warning: 'text-yellow-600', danger: 'text-red-600', info: 'text-blue-600' };
  return colors[type as keyof typeof colors] || 'text-blue-600';
};

const getEventBadge = (type: string) => {
  const badges = {
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  };
  return badges[type as keyof typeof badges] || 'bg-blue-100 text-blue-800';
};

export default function HistoryPopup({ isOpen, onClose }: HistoryPopupProps) {
  const [historyEvents] = useState<HistoryEvent[]>(mockHistory);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-md md:max-w-lg p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Event History Log</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* History Events */}
        <div className="space-y-3 md:space-y-4">
          {historyEvents.length > 0 ? (
            historyEvents.map((event) => (
              <div 
                key={event.id} 
                className="flex items-start space-x-3 md:space-x-4 p-3 rounded-lg bg-white hover:bg-gray-100 transition-colors shadow-sm"
              >
                <div className={`text-base md:text-lg ${getEventColor(event.type)}`}>
                  {getEventIcon(event.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1 flex-wrap gap-1">
                    <span className="text-xs text-gray-500 font-medium">
                      {event.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: true 
                      }).toUpperCase()}
                    </span>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getEventBadge(event.type)}`}>
                      {event.type.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-800 text-xs md:text-sm leading-relaxed">
                    {event.message}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <div className="text-3xl md:text-4xl mb-2">📜</div>
              <p className="text-sm">No history events</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

