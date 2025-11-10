
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
