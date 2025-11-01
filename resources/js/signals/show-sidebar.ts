import { signal } from '@preact/signals';

export const showSidebar = signal(window.innerWidth > 768);

const mq = window.matchMedia('(max-width: 768px)');

const updateSidebar = (e: MediaQueryListEvent | MediaQueryList) => {
    showSidebar.value = !e.matches;
};

updateSidebar(mq);

mq.addEventListener('change', updateSidebar);
