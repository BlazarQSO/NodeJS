import { useState, useCallback, useEffect } from 'react';
import { UUID } from '../interfaces';
import { STORAGE_NAME } from '../constants/storage';

interface UseAuth {
  token: string;
  userId: UUID;
  ready: boolean;
  userLogin: string;
  login: (jwtToken: string, id: UUID, userLogin: string) => void;
  logout: () => void;
}

export const useAuth = (): UseAuth => {
  const [token, setToken] = useState<string>(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState<UUID>(null);
  const [userName, setUserName] = useState(null);

  const login = useCallback((jwtToken: string, id: UUID, userLogin: string) => {
    setToken(jwtToken);
    setUserId(id);
    setUserName(userLogin);

    localStorage.setItem(STORAGE_NAME, JSON.stringify({
      token: jwtToken,
      userId: id,
      userLogin,
    }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUserName(null);
    localStorage.removeItem(STORAGE_NAME);
  }, []);

  useEffect(() => {
    const data: { token: string, userId: UUID, userLogin: string } = JSON.parse(localStorage.getItem(STORAGE_NAME));

    if (data && data.token) {
      login(data.token, data.userId, data.userLogin);
    }

    setReady(true);
  }, []);

  return { login, logout, token, userId, ready, userLogin: userName };
};
