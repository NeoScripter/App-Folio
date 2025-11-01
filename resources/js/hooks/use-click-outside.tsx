import { useEffect, useState } from 'preact/hooks';

export const useClickOutside = (selectors: string[]) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            const el = e.target as HTMLElement | null;
            if (!el) return;

            const inside = selectors.some((sel) => el.closest(sel));
            if (!inside) setShow(false);
        };

        window.addEventListener('click', onClick);
        return () => window.removeEventListener('click', onClick);
    }, [selectors]);

    return { show, setShow };
};
