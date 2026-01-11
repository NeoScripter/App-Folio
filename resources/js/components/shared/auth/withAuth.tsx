import ProtectedRoute from '@/layouts/auth/protected-route';
import { ComponentType } from 'preact';

const withAuth = <P extends object>(Component: ComponentType<P>) => {
    return (props: P) => (
        <ProtectedRoute>
            <Component {...props} />
        </ProtectedRoute>
    );
};

export default withAuth;
