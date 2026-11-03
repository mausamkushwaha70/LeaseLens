"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { clearDemoSession, findOrCreateDemoUser, readDemoSession, saveDemoProfile, saveDemoSession, type DemoUser } from "@/services/mock-auth.service";

type AuthContextValue = {
  user: DemoUser | null;
  ready: boolean;
  signIn: (email: string, remember?: boolean) => DemoUser;
  register: (profile: DemoUser) => DemoUser;
  signOut: () => void;
};
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(readDemoSession());
    setReady(true);
  }, []);

  const signIn = useCallback((email: string, remember = true) => {
    const nextUser = findOrCreateDemoUser(email);
    saveDemoSession(nextUser, remember);
    setUser(nextUser);
    return nextUser;
  }, []);

  const register = useCallback((profile: DemoUser) => {
    saveDemoProfile(profile);
    saveDemoSession(profile, true);
    setUser(profile);
    return profile;
  }, []);

  const signOut = useCallback(() => {
    clearDemoSession();
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, ready, signIn, register, signOut }), [user, ready, signIn, register, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider.");
  return context;
}
