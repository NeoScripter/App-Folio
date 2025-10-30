import { effect } from "@preact/signals";
import { appearance } from "./signals/appearance";
import "../css/app.css";
import {
    ErrorBoundary,
    hydrate,
    lazy,
    LocationProvider,
    Route,
    Router,
} from "preact-iso";

const About = lazy(() => import("./pages/user/about"));
const Login = lazy(() => import("./pages/auth/login"));
const Home = lazy(() => import("./pages/user/home"));
const NotFound = lazy(() => import("./pages/shared/404"));

function App() {
    effect(() => {
        document.documentElement.classList.toggle(
            "dark",
            appearance.value === "dark" ||
                (appearance.value === "system" &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches),
        );
    });

    return (
        <LocationProvider>
            <nav class="p-4 bg-gray-100 flex gap-4">
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/login">Login</a>
            </nav>

            <ErrorBoundary>
                <Router>
                    <Route path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/login" component={Login} />
                    <Route path="*" component={NotFound} />
                </Router>
            </ErrorBoundary>
        </LocationProvider>
    );
}

hydrate(<App />, document.getElementById("app")!);
