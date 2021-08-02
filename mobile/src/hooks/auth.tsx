import React, {
  createContext,
  useCallback,
  useState,
  useEffect,
  useContext,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';
import {ICity} from '../models/city';

// interface ICity {
//   id: string;
//   name: string;
//   state: string;
// }

interface IUser {
  id: string;
  name: string;
  email: string;
  city: ICity;
  phone: string;
  avatarUrl?: string;
}

interface ISignInCredencials {
  email: string;
  password: string;
}

interface IAuthState {
  user: IUser;
  token: string;
}

interface IAuthContextData {
  user: IUser;
  loading: boolean;
  signIn(credencials: ISignInCredencials): Promise<void>;
  signOut(): void;
  updateUser(user: IUser): Promise<void>;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [data, setData] = useState<IAuthState>({} as IAuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@MeAdote:token',
        '@MeAdote:user',
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({token: token[1], user: JSON.parse(user[1])});
      }

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const signIn = useCallback(async ({email, password}) => {
    const response = await api.post('api/v1/auth', {
      email,
      password,
    });

    const {user, token} = response.data;

    await AsyncStorage.multiSet([
      ['@MeAdote:token', token],
      ['@MeAdote:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({
      user,
      token,
    });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@MeAdote:token', '@MeAdote:user']);

    setData({} as IAuthState);
  }, []);

  const updateUser = useCallback(
    async (user: IUser) => {
      await AsyncStorage.setItem('@MeAdote:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{user: data.user, loading, signIn, signOut, updateUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
