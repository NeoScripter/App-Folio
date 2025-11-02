import { effect, signal } from '@preact/signals';

export const showSidebar = signal(window.innerWidth > 768);

const mq = window.matchMedia('(max-width: 768px)');

const updateSidebar = (e: MediaQueryListEvent | MediaQueryList) => {
    showSidebar.value = !e.matches;
};

effect(() => {
    document.documentElement.style.overflowY = showSidebar.value ? 'clip' : 'auto';
});

effect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key !== 'Escape' || window.innerWidth > 768) return;

        showSidebar.value = false;
    };
    window.addEventListener('keydown', handleKeyPress);
});

updateSidebar(mq);

mq.addEventListener('change', updateSidebar);
