import { useNotificationPermissions } from "../notification/permissions";

export const EnableNotification: React.FC = () => {
  const setPermission = useNotificationPermissions(
    (store) => store.setPermission
  );

  if (!("Notification" in window)) return null;
  return (
    <button
      type="button"
      onClick={() => {
        Notification.requestPermission((permission) => {
          setPermission(permission);
        });
      }}
    >
      enable notifcation
    </button>
  );
};
