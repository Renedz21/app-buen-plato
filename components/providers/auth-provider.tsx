"use client";

import {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
  createContext,
  useContext,
} from "react";
import { createClient } from "@/lib/supabase/client";
import type { SignInCredentials, SignUpCredentials } from "@/types/auth";
import type { Session } from "@supabase/supabase-js";
import type { AuthContextValue } from "@/types/auth";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const supabaseRef = useRef(createClient());

  useEffect(() => {
    let cancelled = false;

    supabaseRef.current.auth.getSession().then(({ data: { session } }) => {
      if (!cancelled) {
        setSession(session);
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabaseRef.current.auth.onAuthStateChange((_event, session) => {
      if (!cancelled) {
        setSession(session);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (credentials: SignInCredentials) => {
    const { error } =
      await supabaseRef.current.auth.signInWithPassword(credentials);
    return { error: error as Error | null };
  }, []);

  const signUp = useCallback(async (credentials: SignUpCredentials) => {
    const { error } = await supabaseRef.current.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: { data: { name: credentials.name } },
    });
    return { error: error as Error | null };
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabaseRef.current.auth.signOut();
    return { error: error as Error | null };
  }, []);

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      session,
      loading,
      signIn,
      signUp,
      signOut,
    }),
    [session, loading, signIn, signUp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
