import { useLocation } from 'preact-iso';
import { useFetch } from './use-fetch';
import { currentUser } from '@/signals/auth';

export function useLogout() {
    const { fetchData, loading, errors } = useFetch();
    const { route } = useLocation();

    const logout = async () => {
        await fetchData({
            url: '/logout',
            method: 'POST',
            onSuccess: () => {
                currentUser.value = null;
                route('/');
            },
        });
    };

    return { logout, loading, errors };
}
