import { appearance } from "@/signals/appearance";

export default function About() {
    const toggleTheme = () => {
        appearance.value = appearance.value === "dark" ? "light" : "dark";
    };
    return (
        <div class="p-6">
            <h1 class="text-2xl font-bold">About</h1>
            <p>This page is rendered with preact-iso routing.</p>
            <button onClick={toggleTheme}>Change theme</button>
        </div>
    );
}
