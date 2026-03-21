import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApiUrl } from "@/lib/api";

export type UserRole = "guest" | "registered" | "member" | "admin";

export interface User {
  id: number;
  email: string;
  fullName: string;
  companyName: string | null;
  role: UserRole;
  credits: number;
}

interface AuthContextType {
  user: User | null;
  sessionToken: string | null;
  isGuest: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; fullName: string; companyName?: string }) => Promise<void>;
  logout: () => Promise<void>;
  browseAsGuest: () => void;
  refreshUser: () => Promise<void>;
  updateCredits: (credits: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = "@palmer_user";
const TOKEN_STORAGE_KEY = "@palmer_token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const stored = await AsyncStorage.getItem(USER_STORAGE_KEY);
      const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.isGuest) {
          setIsGuest(true);
        } else {
          setUser(parsed);
          if (token) setSessionToken(token);
        }
      }
    } catch {
      // ignore storage errors
    } finally {
      setIsLoading(false);
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    const response = await fetch(getApiUrl("/auth/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({})) as { error?: string };
      throw new Error(data.error || "Login failed");
    }

    const responseData = await response.json() as User & { token: string };
    const { token, ...userData } = responseData;
    setUser(userData);
    setSessionToken(token);
    setIsGuest(false);
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
  }, []);

  const register = useCallback(async (data: { email: string; password: string; fullName: string; companyName?: string }) => {
    const response = await fetch(getApiUrl("/auth/register"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const resData = await response.json().catch(() => ({})) as { error?: string };
      throw new Error(resData.error || "Registration failed");
    }

    const responseData = await response.json() as User & { token: string };
    const { token, ...userData } = responseData;
    setUser(userData);
    setSessionToken(token);
    setIsGuest(false);
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    setSessionToken(null);
    setIsGuest(false);
    await AsyncStorage.multiRemove([USER_STORAGE_KEY, TOKEN_STORAGE_KEY]);
  }, []);

  const browseAsGuest = useCallback(() => {
    setIsGuest(true);
    AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify({ isGuest: true }));
  }, []);

  const updateCredits = useCallback((credits: number) => {
    if (user) {
      const updated = { ...user, credits };
      setUser(updated);
      AsyncStorage.getItem(USER_STORAGE_KEY).then((stored) => {
        if (stored) {
          const parsed = JSON.parse(stored);
          AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify({ ...parsed, credits }));
        }
      });
    }
  }, [user]);

  const refreshUser = useCallback(async () => {
    if (!user || !sessionToken) return;
    try {
      const response = await fetch(getApiUrl("/auth/refresh"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionToken}`,
        },
      });
      if (response.ok) {
        const responseData = await response.json() as User & { token: string };
        const { token, ...userData } = responseData;
        setUser(userData);
        setSessionToken(token);
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
        await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
      }
    } catch {
      // ignore refresh errors
    }
  }, [user, sessionToken]);

  return (
    <AuthContext.Provider
      value={{ user, sessionToken, isGuest, isLoading, login, register, logout, browseAsGuest, refreshUser, updateCredits }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
