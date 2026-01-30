"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { SignInCredentials, SignUpCredentials } from "@/types/auth";
import type { Session } from "@supabase/supabase-js";
import { createContext, useContext } from "react";
import type { AuthContextValue } from "@/types/auth";
import { SubscriptionProvider } from "./subscription-provider";

const supabase = createClient();

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = useCallback(async (credentials: SignInCredentials) => {
    const { error } = await supabase.auth.signInWithPassword(credentials);
    return { error: error as Error | null };
  }, []);

  const signUp = useCallback(async (credentials: SignUpCredentials) => {
    const { error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: { data: { name: credentials.name } },
    });
    return { error: error as Error | null };
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
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

  return (
    <AuthContext.Provider value={value}>
      <SubscriptionProvider userId={session?.user?.id ?? null}>
        {children}
      </SubscriptionProvider>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
