import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import UserModel from "../database/model/User";

interface User {
  id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string | null;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): Promise<void>;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

interface IAuthProvider {
  children: ReactNode;
}

function AuthProvider({ children }: IAuthProvider) {
  const [user, setUser] = useState<User>({} as User);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const { data } = await api.post("/sessions", {
        email,
        password
      });

      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      await UserModel.saveUser({
        ...data.user,
        token: data.token
      });

      setUser({
        ...data.user,
        token: data.token
      });
    }
    catch (err: any) {
      throw new Error(err);
    }
  }

  useEffect(() => {
    async function loadUserData() {
      const userLogged = await UserModel.getUser();

      if (userLogged) {
        api.defaults.headers.common["Authorization"] = `Bearer ${userLogged.token}`;
        setUser(userLogged);
      }
    }

    loadUserData();
  }, []);

  async function signOut() {
    try {
      await UserModel.deleteUser();

      setUser({} as User);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  return (
    <AuthContext.Provider value={
      {
        signIn,
        user,
        signOut
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