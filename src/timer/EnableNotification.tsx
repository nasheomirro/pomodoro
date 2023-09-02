import { shallow } from "zustand/shallow";
import { useNotificationPermission } from "../app";
import { Button } from "../components/Button";

export const EnableNotification: React.FC = () => {
  const { permission, setPermission } = useNotificationPermission(
    (store) => ({ ...store }),
    shallow
  );

  if (permission === "NA") return null;

  return (
    <Button
      type="button"
      onClick={() => {
        Notification.requestPermission((permission) => {
          setPermission(permission);
        });
      }}
    >
      enable notifcation
    </Button>
  );
};
