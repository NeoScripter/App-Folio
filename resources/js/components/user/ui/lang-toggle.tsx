import { locale } from '@/signals/locale';
import { cn } from '@/utils/cn';
import { FC } from 'preact/compat';

const LangToggle: FC<{ className?: string }> = ({ className }) => {
    return (
        <div
            class={cn(
                'divide-foreground flex items-center lg:border lg:border-white/30 lg:py-1 lg:px-4 lg:rounded-full divide-x-2 text-sm lg:divide-none',
                className,
            )}
        >
            <Button lang="ru" className="pr-3 lg:pr-2" />
            <Button lang="en" className="pl-3 lg:pl-1" />
        </div>
    );
};

export default LangToggle;

const Button: FC<{ lang: 'en' | 'ru'; className?: string }> = ({
    lang,
    className,
}) => {
    const active = locale.value === lang;

    return (
        <button
            onClick={() => (locale.value = lang)}
            class={cn(
                '',
                active ? 'font-bold' : 'font-normal opacity-50',
                className,
            )}
        >
            {lang.toUpperCase()}
        </button>
    );
};


