// src/components/dashboard/Notifications/NotificationsPanel.tsx
import type { Notification } from '../../../types/dashboard';

interface NotificationsPanelProps {
  notifications: Notification[];
}

const getNotificationIcon = (type: string) => {
  const icons = { warning: '⚠️', danger: '🔴', info: 'ℹ️' };
  return icons[type as keyof typeof icons] || 'ℹ️';
};

const getNotificationColor = (type: string) => {
  const colors = { warning: 'text-yellow-600', danger: 'text-red-600', info: 'text-blue-600' };
  return colors[type as keyof typeof colors] || 'text-blue-600';
};

const getNotificationBadge = (type: string) => {
  const badges = {
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  };
  return badges[type as keyof typeof badges] || 'bg-blue-100 text-blue-800';
};

export default function NotificationsPanel({ notifications }: NotificationsPanelProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 md:p-6 shadow-inner shadow-gray-300 w-full md:w-[400px] h-auto md:h-[435px]">
      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6 text-center">
        Alerts & Notifications
      </h3>
      
      <div className="space-y-3 md:space-y-4 max-h-[300px] md:max-h-[calc(100%-80px)] overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div 
              key={notification.id} 
              className="flex items-start space-x-3 md:space-x-4 p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <div className={`text-base md:text-lg ${getNotificationColor(notification.type)}`}>
                {getNotificationIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1 flex-wrap gap-1">
                  <span className="text-xs text-gray-500 font-medium">
                    {notification.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: true 
                    }).toUpperCase()}
                  </span>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getNotificationBadge(notification.type)}`}>
                    {notification.type.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-800 text-xs md:text-sm leading-relaxed">
                  {notification.message}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 h-full flex items-center justify-center">
            <div>
              <div className="text-3xl md:text-4xl mb-2">📋</div>
              <p className="text-sm">No notifications</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

