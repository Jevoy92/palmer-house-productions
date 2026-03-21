import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PalId } from "@/constants/data";
import Colors from "@/constants/colors";

type ActivePalId = PalId | null;

interface ActivePalContextType {
  activePal: ActivePalId;
  setActivePal: (pal: ActivePalId) => void;
  accentColor: string;
}

const STORAGE_KEY = "@palmer_active_pal";

const PAL_ACCENT_COLORS: Record<PalId, string> = {
  reel: Colors.pal.reel,
  system: Colors.pal.system,
  evergreen: Colors.pal.evergreen,
  spotlight: Colors.pal.spotlight,
};

const ActivePalContext = createContext<ActivePalContextType | undefined>(undefined);

export function ActivePalProvider({ children }: { children: React.ReactNode }) {
  const [activePal, setActivePalState] = useState<ActivePalId>(null);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((val) => {
      if (val && (val === "reel" || val === "system" || val === "evergreen" || val === "spotlight")) {
        setActivePalState(val as PalId);
      }
    }).catch(() => {});
  }, []);

  const setActivePal = useCallback((pal: ActivePalId) => {
    setActivePalState(pal);
    if (pal) {
      AsyncStorage.setItem(STORAGE_KEY, pal).catch(() => {});
    } else {
      AsyncStorage.removeItem(STORAGE_KEY).catch(() => {});
    }
  }, []);

  const accentColor = activePal ? PAL_ACCENT_COLORS[activePal] : Colors.light.primary;

  return (
    <ActivePalContext.Provider value={{ activePal, setActivePal, accentColor }}>
      {children}
    </ActivePalContext.Provider>
  );
}

export function useActivePal() {
  const context = useContext(ActivePalContext);
  if (!context) throw new Error("useActivePal must be used within ActivePalProvider");
  return context;
}
