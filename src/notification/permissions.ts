import { create } from "zustand";

type Permission = {
  permission: NotificationPermission | "NA";
  setPermission: (permission: NotificationPermission) => void;
};

const getPermission = () => {
  if ("Notification" in window) {
    return Notification.permission;
  }
  return "NA";
};

export const useNotificationPermissions = create<Permission>()((set) => ({
  permission: getPermission(),
  setPermission: (permission) => {
    if ("Notification" in window) set((state) => ({ ...state, permission }));
  },
}));
