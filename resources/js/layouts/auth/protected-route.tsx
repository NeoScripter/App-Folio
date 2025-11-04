import { useAuth } from '@/hooks/use-auth';
import { currentUser } from '@/signals/auth';
import { useLocation } from 'preact-iso';
import { useEffect } from 'preact/hooks';

export default function ProtectedRoute({
    children,
}: {
    children: preact.ComponentChildren;
}) {
    const { route } = useLocation();
    const { loadUser, loading } = useAuth();

    useEffect(() => {
        (async () => {
            try {
                await loadUser();
                if (!currentUser.value) route('/login');
            } catch {
                route('/login');
            }
        })();
    }, []);

    if (loading) return <div>Loading...</div>;

    return currentUser.value ? <>{children}</> : null;
}
