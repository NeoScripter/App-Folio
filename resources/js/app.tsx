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
import withAuth from './components/shared/auth/withAuth';

const About = lazy(() => import('./pages/user/about/about'));
const Login = lazy(() => import('./pages/auth/login'));
const Home = lazy(() => import('./pages/user/home/home'));
const Portfolio = lazy(() => import('./pages/user/portfolio/portfolio'));
const Project = lazy(() => import('./pages/user/project/project'));
const Dashboard = lazy(() => import('./pages/admin/dashboard'));
const Reviews = lazy(() => import('./pages/admin/reviews'));
const Faqs = lazy(() => import('./pages/admin/faqs/faqs'));
const Faq = lazy(() => import('./pages/admin/faqs/pages/edit-faq'));
const Appearance = lazy(() => import('./pages/admin/appearance'));
const Profile = lazy(() => import('./pages/admin/profile'));
const Password = lazy(() => import('./pages/admin/password'));
const NotFound = lazy(() => import('./pages/shared/404'));

const withProtectedRoute = (Component) => (props) => (
    <ProtectedRoute>
        <Component {...props} />
    </ProtectedRoute>
);

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
                    <Route path="/portfolio/:slug" component={Project} />
                    <Route path="/login" component={Login} />

                     {/* Admin Panel */}
                    <Route path="/dashboard" component={withAuth(Dashboard)} />
                    <Route path="/reviews" component={withAuth(Reviews)} />
                    <Route path="/faqs" component={withAuth(Faqs)} />
                    <Route path="/faqs/:id" component={withAuth(Faq)} />
                    <Route path="/settings/appearance" component={withAuth(Appearance)} />
                    <Route path="/settings/profile" component={withAuth(Profile)} />
                    <Route path="/settings/password" component={withAuth(Password)} />
                    <Route path="*" component={NotFound} />
                </Router>
            </ErrorBoundary>
        </LocationProvider>
    );
}

hydrate(<App />, document.getElementById('app')!);
