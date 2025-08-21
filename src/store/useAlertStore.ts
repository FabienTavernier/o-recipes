import type { Alert } from "@/@types"
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type AlertState = {
  alert: Alert | null;
}

type AlertActions = {
  setAlert: (alert: Alert) => void;
  clearAlert: () => void;
};

export const useAlertStore = create<AlertState & AlertActions>()(
  devtools((set) => ({
    alert: null,

    setAlert: (alert) =>
      set(
        () => ({ alert }),
        undefined,
        'alert/set',
      ),

    clearAlert: () =>
      set(
        () => ({ alert: null }),
        undefined,
        'alert/clear',
      ),
  }))
);
