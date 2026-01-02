import type { User, Session } from "@supabase/supabase-js";

export interface AuthState {
	user: User | null;
	session: Session | null;
	loading: boolean;
}

export interface SignInCredentials {
	email: string;
	password: string;
}

export interface SignUpCredentials {
	email: string;
	password: string;
}

export interface AuthContextValue extends AuthState {
	signIn: (credentials: SignInCredentials) => Promise<{
		error: Error | null;
	}>;
	signUp: (credentials: SignUpCredentials) => Promise<{
		error: Error | null;
	}>;
	signOut: () => Promise<{
		error: Error | null;
	}>;
}

