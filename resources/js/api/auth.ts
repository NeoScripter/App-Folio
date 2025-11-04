import getCsrfToken from '@/utils/getCsrfToken';

export async function login(email: string, password: string) {
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': getCsrfToken()!,
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error('Invalid credentials');
    return res.json();
}

export async function logout() {
    const res = await fetch('/logout', {
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': getCsrfToken()!,
            Accept: 'application/json',
        },
        credentials: 'include',
    });

    if (!res.ok) throw new Error('Logout failed');

    window.location.href = '/';
}

export async function getUser() {
    const res = await fetch('/user');
    if (!res.ok) throw new Error('Not authenticated');
    return res.json();
}

export function readCookie(name: string): string | null {
    const v = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return v ? v.pop() || null : null;
}

export function getXSRFTokenFromCookie(): string | null {
    const raw = readCookie('XSRF-TOKEN');
    return raw ? decodeURIComponent(raw) : null;
}

export async function initCsrf() {
    await fetch('/sanctum/csrf-cookie', { credentials: 'include' });
    return getXSRFTokenFromCookie();
}
