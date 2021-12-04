import { SESSION_STORAGE } from '@constants';
import useStorage from './useStorage';

export const useUser = () => {
    const { getItem, setItem } = useStorage();

    return {
        user: getItem(SESSION_STORAGE.user),
        userRole: getItem(SESSION_STORAGE.userRole),
        token: getItem(SESSION_STORAGE.token),
        loading: false,
        setUser: ({ username, token, role }: { username: string, token: string, role: string }) => {
            setItem(SESSION_STORAGE.user, username);
            setItem(SESSION_STORAGE.token, token);
            setItem(SESSION_STORAGE.userRole, role);
        }
    }
};
