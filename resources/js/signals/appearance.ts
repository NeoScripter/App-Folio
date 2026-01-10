import { effect, signal } from '@preact/signals';

// Signal for user preference
export const appearance = signal<'light' | 'dark' | 'system'>(
    (localStorage.getItem('appearance') as 'light' | 'dark' | 'system') ||
        'system',
);

// Get system theme preference
export const prefersDark = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches;

// Signal for the actual system theme (reactive)
export const systemTheme = signal<'light' | 'dark'>(
    prefersDark() ? 'dark' : 'light',
);

// Get the effective theme (considering system preference)
export const effectiveTheme = () => {
    const mode = appearance.value;
    if (mode === 'system') {
        return systemTheme.value;
    }
    return mode;
};

// Apply theme to document
const applyTheme = (mode: string) => {
    const isDark = mode === 'dark' || (mode === 'system' && prefersDark());
    document.documentElement.classList.toggle('dark', isDark);
};

// Effect to apply theme when appearance changes
effect(() => {
    const mode = appearance.value;
    localStorage.setItem('appearance', mode);
    applyTheme(mode);
});

// Listen for system theme changes
window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
        systemTheme.value = e.matches ? 'dark' : 'light';
        if (appearance.value === 'system') {
            applyTheme('system');
        }
    });
