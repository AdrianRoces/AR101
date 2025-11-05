export interface SensorData {
  gasLevel: number;
  gasStatus: 'SAFE' | 'WARNING' | 'DANGER';
  flameDetected: boolean;
}

export interface Notification {
  id: string;
  timestamp: Date;
  message: string;
  type: 'info' | 'warning' | 'danger';
}

export interface SystemStatus {
  solenoidValve: 'Open' | 'Closed';
  waterSpray: 'Active' | 'Idle' | 'Deactivated';
}

export interface BatteryStatus {
  level: number;
  voltage: number;
  status: 'CHARGING' | 'DISCHARGING' | 'FULL' | 'LOW';
}

export interface DashboardData {
  sensors: SensorData;
  notifications: Notification[];
  systemStatus: SystemStatus;
  battery: BatteryStatus; // Add this
}