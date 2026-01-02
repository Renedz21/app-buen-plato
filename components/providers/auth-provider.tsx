"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { AuthContext } from "@/contexts/auth-context";
import type {
  AuthContextValue,
  SignInCredentials,
  SignUpCredentials,
} from "@/types/auth";
import type { Session } from "@supabase/supabase-js";

interface AuthProviderProps {
  children: React.ReactNode;
}

const supabase = createClient();

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const user = session?.user ?? null;

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

  const signIn = async (credentials: SignInCredentials) => {
    const { error } = await supabase.auth.signInWithPassword(credentials);
    return { error: error as Error | null };
  };

  const signUp = async (credentials: SignUpCredentials) => {
    const { error } = await supabase.auth.signUp(credentials);
    return { error: error as Error | null };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error: error as Error | null };
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      loading,
      signIn,
      signUp,
      signOut,
    }),
    [user, session, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
