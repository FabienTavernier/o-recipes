import type { Alert } from "@/@types"
import { create } from "zustand";

type AlertState = {
  alert: Alert | null;
}

type AlertActions = {
  setAlert: (alert: Alert) => void;
};

export const useAlertStore = create<AlertState & AlertActions>()((set) => ({
  alert: null,

  setAlert: (alert) => set(() => ({ alert }))
}));
