import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/contexts/AuthContext";

interface UsageStats {
  totalCreditsUsed: number;
  totalGenerations: number;
  toolsUsed: Record<string, number>;
}

interface UsageContextType {
  stats: UsageStats;
  recordUsage: (toolId: string, creditsCost: number) => void;
  toolsMastered: number;
  uniqueToolsUsed: number;
}

const USAGE_KEY = "@palmer_usage_stats";

const DEFAULT_STATS: UsageStats = {
  totalCreditsUsed: 0,
  totalGenerations: 0,
  toolsUsed: {},
};

const UsageContext = createContext<UsageContextType | undefined>(undefined);

export function UsageProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<UsageStats>(DEFAULT_STATS);
  const { user } = useAuth();

  useEffect(() => {
    loadStats();
  }, [user?.id]);

  const loadStats = async () => {
    try {
      const key = user?.id ? `${USAGE_KEY}_${user.id}` : USAGE_KEY;
      const stored = await AsyncStorage.getItem(key);
      if (stored) {
        setStats(JSON.parse(stored));
      } else {
        setStats(DEFAULT_STATS);
      }
    } catch {
      setStats(DEFAULT_STATS);
    }
  };

  const saveStats = async (newStats: UsageStats) => {
    try {
      const key = user?.id ? `${USAGE_KEY}_${user.id}` : USAGE_KEY;
      await AsyncStorage.setItem(key, JSON.stringify(newStats));
    } catch {}
  };

  const recordUsage = useCallback((toolId: string, creditsCost: number) => {
    setStats((prev) => {
      const updated: UsageStats = {
        totalCreditsUsed: prev.totalCreditsUsed + creditsCost,
        totalGenerations: prev.totalGenerations + 1,
        toolsUsed: {
          ...prev.toolsUsed,
          [toolId]: (prev.toolsUsed[toolId] || 0) + 1,
        },
      };
      saveStats(updated);
      return updated;
    });
  }, [user?.id]);

  const toolsMastered = Object.values(stats.toolsUsed).filter((count) => count >= 5).length;
  const uniqueToolsUsed = Object.keys(stats.toolsUsed).length;

  return (
    <UsageContext.Provider value={{ stats, recordUsage, toolsMastered, uniqueToolsUsed }}>
      {children}
    </UsageContext.Provider>
  );
}

export function useUsage() {
  const context = useContext(UsageContext);
  if (!context) throw new Error("useUsage must be used within UsageProvider");
  return context;
}
