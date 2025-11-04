import { currentUser } from '@/signals/auth';
import { useFetch } from './use-fetch';

export function useAuth() {
    const { fetchData, data, loading, errors } = useFetch();

    async function loadUser() {
        if (currentUser.value) return;

        await fetchData({
            url: '/user',
            method: 'GET',
            onSuccess: (userData) => {
                console.log(userData);
                currentUser.value = userData;
            },
        });
    }

    return { loadUser, loading, errors };
}
