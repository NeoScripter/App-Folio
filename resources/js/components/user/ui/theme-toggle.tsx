import { appearance } from '@/signals/appearance';
import { cn } from '@/utils/cn';
import { FC, JSX } from 'preact/compat';

const ThemeToggle: FC<{ className?: string }> = ({ className }) => {
    const handleChange = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
        if (e.currentTarget.checked) {
            appearance.value = 'dark';
        } else {
            appearance.value = 'light';
        }
    };

    const isDark = appearance.value === 'dark';

    return (
        <div
            class={cn(
                'theme-switch relative flex items-center gap-3',
                className,
            )}
        >
            <input
                id="switch"
                type="checkbox"
                checked={isDark}
                onChange={handleChange}
                aria-label="Переключить тему"
                aria-checked={isDark}
                role="switch"
            />
            <label
                htmlFor="switch"
                class="border-foreground/50 w-17 lg:w-20 border-2 lg:border-white/50"
                aria-hidden="true"
            />
        </div>
    );
};

export default ThemeToggle;
