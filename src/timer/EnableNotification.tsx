import { shallow } from "zustand/shallow";
import { useNotificationPermission } from "../app";

export const EnableNotification: React.FC = () => {
  const { permission, setPermission } = useNotificationPermission(
    (store) => ({ ...store }),
    shallow
  );

  if (permission === "NA") return null;

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
