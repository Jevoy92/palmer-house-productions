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
  isGuest: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; fullName: string; companyName?: string }) => Promise<void>;
  logout: () => Promise<void>;
  browseAsGuest: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = "@palmer_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const stored = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.isGuest) {
          setIsGuest(true);
        } else {
          setUser(parsed);
        }
      }
    } catch {
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
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || "Login failed");
    }

    const userData = await response.json();
    setUser(userData);
    setIsGuest(false);
    const toStore = { ...userData, _credentials: { email, password } };
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(toStore));
  }, []);

  const register = useCallback(async (data: { email: string; password: string; fullName: string; companyName?: string }) => {
    const response = await fetch(getApiUrl("/auth/register"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const resData = await response.json().catch(() => ({}));
      throw new Error(resData.error || "Registration failed");
    }

    const userData = await response.json();
    setUser(userData);
    setIsGuest(false);
    const toStore = { ...userData, _credentials: { email: data.email, password: data.password } };
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(toStore));
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    setIsGuest(false);
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
  }, []);

  const browseAsGuest = useCallback(() => {
    setIsGuest(true);
    AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify({ isGuest: true }));
  }, []);

  const refreshUser = useCallback(async () => {
    if (!user) return;
    try {
      const stored = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored);
      if (parsed._credentials) {
        const response = await fetch(getApiUrl("/auth/refresh"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: parsed._credentials.email,
            password: parsed._credentials.password,
          }),
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          const toStore = { ...userData, _credentials: parsed._credentials };
          await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(toStore));
        }
      }
    } catch {}
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, isGuest, isLoading, login, register, logout, browseAsGuest, refreshUser }}
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
