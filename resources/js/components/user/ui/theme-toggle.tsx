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

    return (
        <div class={cn('theme-switch flex items-center gap-3 relative', className)}>
            <input
                id="switch"
                type="checkbox"
                checked={appearance.value === 'dark'}
                onChange={handleChange}
            />
            <label htmlFor="switch" class="border-foreground/20 lg:border-white/20 w-15 border-2"/>
            <span class="text-xs lg:absolute lg:-top-6 lg:-right-5 whitespace-nowrap">
                {appearance.value === 'dark' ? 'Темная ' : 'Светлая '} тема
            </span>
        </div>
    );
};

export default ThemeToggle;
