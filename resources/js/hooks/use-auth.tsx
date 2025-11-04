import { currentUser } from '@/signals/auth';
import { useFetch } from './use-fetch';

export function useAuth() {
    const { fetchData, loading, errors } = useFetch();

    async function loadUser() {
        if (currentUser.value) return;

        await fetchData({
            url: '/user',
            method: 'GET',
            onSuccess: (userData) => {
                currentUser.value = userData;
            },
        });
    }

    return { loadUser, loading, errors };
}
