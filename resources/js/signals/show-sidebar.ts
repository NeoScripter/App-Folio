import { effect, signal } from '@preact/signals';

export const showSidebar = signal(window.innerWidth > 768);

const mq = window.matchMedia('(max-width: 768px)');

const updateSidebar = (e: MediaQueryListEvent | MediaQueryList) => {
    showSidebar.value = !e.matches;
};

effect(() => {
    if (showSidebar.value) {
        document.documentElement.style.overflowY = 'clip';
    } else {
        document.documentElement.style.overflowY = 'auto';
    }
});

updateSidebar(mq);

mq.addEventListener('change', updateSidebar);
