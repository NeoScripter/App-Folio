import { useEffect, useState } from "preact/hooks";

export default function Home() {
    const [msg, setMsg] = useState("Loading...");

    useEffect(() => {
        fetch("/api/hello")
            .then((res) => res.json())
            .then((data) => setMsg(data.message))
            .catch(() => setMsg("Error fetching API"));
    }, []);

    return (
        <main class="text-blue-500">
            <h1>{msg}</h1>
            <a href="/dashboard">Admin</a>
        </main>
    );
}
