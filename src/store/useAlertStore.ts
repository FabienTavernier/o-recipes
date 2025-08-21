import type { Alert } from "@/@types"
import { create } from "zustand";

type AlertState = {
  alert: Alert | null;
}

export const useAlertStore = create<AlertState>()(() => ({
  alert: {
    status: 'error',
    message: 'Fausse alerte pour Zustand'
  },
}));
