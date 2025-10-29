export interface ActivityEvent {
  id: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'success' | 'error';
  icon?: string;
}

export interface SensorStatus {
  name: string;
  status: 'normal' | 'warning' | 'error' | 'offline';
  value: string;
  icon?: string;
  trend?: 'up' | 'down' | 'stable';
}