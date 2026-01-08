import { effect } from '@preact/signals';
import {
    ErrorBoundary,
    hydrate,
    lazy,
    LocationProvider,
    Route,
    Router,
} from 'preact-iso';
import '../css/app.css';
import ProtectedRoute from './layouts/auth/protected-route';
import { appearance } from './signals/appearance';

const About = lazy(() => import('./pages/user/about/about'));
const Login = lazy(() => import('./pages/auth/login'));
const Home = lazy(() => import('./pages/user/home/home'));
const Portfolio = lazy(() => import('./pages/user/portfolio/portfolio'));
const Project = lazy(() => import('./pages/user/project/project'));
const Dashboard = lazy(() => import('./pages/admin/dashboard'));
const Appearance = lazy(() => import('./pages/admin/appearance'));
const Profile = lazy(() => import('./pages/admin/profile'));
const Password = lazy(() => import('./pages/admin/password'));
const NotFound = lazy(() => import('./pages/shared/404'));

function App() {
    effect(() => {
        document.documentElement.classList.toggle(
            'dark',
            appearance.value === 'dark' ||
                (appearance.value === 'system' &&
                    window.matchMedia('(prefers-color-scheme: dark)').matches),
        );
    });

    return (
        <LocationProvider>
            <ErrorBoundary>
                <Router>
                    <Route path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/portfolio" component={Portfolio} />
                    <Route path="/portfolio/:id" component={Project} />
                    <Route path="/login" component={Login} />

                    <Route
                        path="/dashboard"
                        component={() => (
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        )}
                    />
                    <Route
                        path="/settings/appearance"
                        component={() => (
                            <ProtectedRoute>
                                <Appearance />
                            </ProtectedRoute>
                        )}
                    />
                    <Route
                        path="/settings/profile"
                        component={() => (
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        )}
                    />
                    <Route
                        path="/settings/password"
                        component={() => (
                            <ProtectedRoute>
                                <Password />
                            </ProtectedRoute>
                        )}
                    />
                    <Route path="*" component={NotFound} />
                </Router>
            </ErrorBoundary>
        </LocationProvider>
    );
}

hydrate(<App />, document.getElementById('app')!);
