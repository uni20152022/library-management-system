import { SESSION_STORAGE } from "@constants";
import { useStorage } from "@hooks";

export const useUser = () => {
  const { getItem, setItem, removeItem } = useStorage();

  return {
    user: getItem(SESSION_STORAGE.user),
    userRole: getItem(SESSION_STORAGE.userRole),
    token: getItem(SESSION_STORAGE.token),
    loading: false,
    setUser: ({
      username,
      token,
      role,
    }: {
      username: string;
      token: string;
      role: string;
    }) => {
      setItem(SESSION_STORAGE.user, username);
      setItem(SESSION_STORAGE.token, token);
      setItem(SESSION_STORAGE.userRole, role);
    },
    logout: () => {
      removeItem(SESSION_STORAGE.user);
      removeItem(SESSION_STORAGE.token);
      removeItem(SESSION_STORAGE.userRole);
    },
  };
};
