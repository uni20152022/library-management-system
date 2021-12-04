import { useUser } from '@hooks';

const api = "http://188.166.188.217";

export const requests = {
    get: function get(resource: string) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { token } = useUser();
        const authorizationHeader =
            token ? {
                'Authorization': token || '',
            } : {};
        return fetch(api + resource, {
            cache: 'no-cache',
            headers: {
                ...authorizationHeader,
            },
            method: 'GET',
            mode: 'cors',
            referrerPolicy: 'origin',
        });
    },
    post: function post(resource: string, data: object) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { token } = useUser();
        const authorizationHeader =
            token ? {
                'Authorization': token || '',
            } : {};

        return fetch(api + resource, {
            body: JSON.stringify(data),
            cache: 'no-cache',
            // credentials: 'include',
            headers: {
                ...authorizationHeader,
                'Content-Type': 'application/json',
            },
            method: 'POST',
            mode: 'cors',
            referrerPolicy: 'origin',
        });
    }
}