import { currentUser } from '@/signals/auth';
import { useFetch } from './use-fetch';

export function useAuth() {
    const { fetchData, loading, errors } = useFetch();

    async function loadUser() {
        await fetchData({
            url: '/user',
            method: 'GET',
            onSuccess: (userData) => {
                currentUser.value = userData;
            },
            onError: () => (currentUser.value = null),
        });
    }

    return { loadUser, loading, errors };
}
