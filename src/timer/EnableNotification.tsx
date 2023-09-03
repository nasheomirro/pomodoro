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
      disabled={permission === "granted"}
      onClick={() => {
        Notification.requestPermission((permission) => {
          setPermission(permission);
        });
      }}
    >
      {permission !== "granted" ? "enable notifcation" : "notification enabled"}
    </Button>
  );
};
