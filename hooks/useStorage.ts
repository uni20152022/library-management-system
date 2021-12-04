type StorageType = 'session' | 'local';

type UseStorageReturnValue = {
    getItem: (key: string, type?: StorageType) => string | null;
    setItem: (key: string, value: string, type?: StorageType) => void;
    removeItem: (key: string, type?: StorageType) => void;
};

const useStorage = (): UseStorageReturnValue => {

    const storageType = (type?: StorageType): 'localStorage' | 'sessionStorage' => `${type ?? 'session'}Storage`;
    const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();

    const getItem = (key: string, type?: StorageType): string | null => {
        const storageType: 'localStorage' | 'sessionStorage' = `${type ?? 'session'}Storage`;
        return isBrowser ? window[storageType][key] : null;
    };

    const setItem = (key: string, value: string, type?: StorageType): void => {
        isBrowser && window[storageType(type)].setItem(key, value);
    };

    const removeItem = (key: string, type?: StorageType): void => {
        isBrowser && window[storageType(type)].removeItem(key);
    };

    return {
        getItem,
        setItem,
        removeItem,
    };
};

export default useStorage;