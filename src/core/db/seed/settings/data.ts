export function getData() {
  const settings = {
    isUnderMaintenance: process.env.NODE_ENV === 'production' ? 1 : 0,
    maintenanceMessage: 'UNDER MAINTENANCE',
  };

  return settings;
}
