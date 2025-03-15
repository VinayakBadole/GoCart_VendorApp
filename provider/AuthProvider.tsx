import { Session } from '@supabase/supabase-js';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { supabase } from "../lib/supabase";

type AuthContextType = {
  isAuthenticated: boolean;
  session?: Session | null;
  userId?: string;
  isReady: boolean; // New flag to indicate when authentication is ready
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isReady: false, // Default false until authentication check completes
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsReady(true); // Mark ready once session is fetched
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!isReady) {
    return <ActivityIndicator />; // Show loading only when auth is initializing
  }

  return (
    <AuthContext.Provider
      value={{ session, isAuthenticated: !!session?.user, userId: session?.user.id, isReady }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
