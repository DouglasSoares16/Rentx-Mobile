import React, { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string | null;
}

interface IAuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

interface IAuthProvider {
  children: ReactNode;
}

function AuthProvider({ children }: IAuthProvider) {
  const [session, setSession] = useState<IAuthState>({} as IAuthState);

  async function signIn({ email, password }: SignInCredentials) {
    const { data } = await api.post("/sessions", {
      email,
      password
    });

    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

    setSession(data);
  }

  return (
    <AuthContext.Provider value={
      {
        signIn,
        user: session.user
      }
    }>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };