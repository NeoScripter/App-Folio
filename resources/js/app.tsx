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
import { appearance } from './signals/appearance';
import withAuth from './components/shared/auth/withAuth';

const About = lazy(() => import('./pages/user/about/about'));
const Login = lazy(() => import('./pages/auth/login'));
const Home = lazy(() => import('./pages/user/home/home'));
const Portfolio = lazy(() => import('./pages/user/portfolio/portfolio'));
const Project = lazy(() => import('./pages/user/project/project'));
const Dashboard = lazy(() => import('./pages/admin/dashboard'));
const Reviews = lazy(() => import('./pages/admin/reviews/reviews'));
const EditReview = lazy(() => import('./pages/admin/reviews/pages/edit-review'));
const CreateReview = lazy(() => import('./pages/admin/reviews/pages/create-review'));
const Faqs = lazy(() => import('./pages/admin/faqs/faqs'));
const EditFaq = lazy(() => import('./pages/admin/faqs/pages/edit-faq'));
const CreateFaq = lazy(() => import('./pages/admin/faqs/pages/create-faq'));
const Videos = lazy(() => import('./pages/admin/videos/videos'));
const EditVideo = lazy(() => import('./pages/admin/videos/pages/edit-video'));
const CreateVideo = lazy(() => import('./pages/admin/videos/pages/create-video'));
const Stacks = lazy(() => import('./pages/admin/stacks/stacks'));
const EditStack = lazy(() => import('./pages/admin/stacks/pages/edit-stack'));
const CreateStack = lazy(() => import('./pages/admin/stacks/pages/create-stack'));
const Projects = lazy(() => import('./pages/admin/projects/projects'));
const EditProject = lazy(() => import('./pages/admin/projects/pages/edit-project'));
const CreateProject = lazy(() => import('./pages/admin/projects/pages/create-project'));
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
                    <Route path="/portfolio/:slug" component={Project} />
                    <Route path="/login" component={Login} />

                     {/* Admin Panel */}
                    <Route path="/dashboard" component={withAuth(Dashboard)} />
                    <Route path="/reviews" component={withAuth(Reviews)} />
                    <Route path="/reviews/create" component={withAuth(CreateReview)} />
                    <Route path="/reviews/:id" component={withAuth(EditReview)} />
                    <Route path="/faqs" component={withAuth(Faqs)} />
                    <Route path="/faqs/create" component={withAuth(CreateFaq)} />
                    <Route path="/faqs/:id" component={withAuth(EditFaq)} />
                    <Route path="/videos" component={withAuth(Videos)} />
                    <Route path="/videos/create" component={withAuth(CreateVideo)} />
                    <Route path="/videos/:id" component={withAuth(EditVideo)} />
                    <Route path="/stacks" component={withAuth(Stacks)} />
                    <Route path="/stacks/create" component={withAuth(CreateStack)} />
                    <Route path="/stacks/:id" component={withAuth(EditStack)} />
                    <Route path="/projects" component={withAuth(Projects)} />
                    <Route path="/projects/create" component={withAuth(CreateProject)} />
                    <Route path="/projects/:slug" component={withAuth(EditProject)} />
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
