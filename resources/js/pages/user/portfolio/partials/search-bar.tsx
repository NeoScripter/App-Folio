import Input from '@/components/auth/form/input';
import { NodeProps } from '@/lib/types/nodeProps';
import { locale } from '@/signals/locale';
import { cn } from '@/utils/cn';
import { Search } from 'lucide-preact';
import { ChangeEvent, FC, useState } from 'preact/compat';

const SearchBar: FC<NodeProps<{value: string, handleChange: (val: string) => void}>> = ({ className, value, handleChange }) => {
    const lang = locale.value === 'en' ? 'en' : 'ru';
    const placeholder =
        lang === 'en'
            ? 'Search by project name or stack'
            : 'Поиск по названию или стэку проекта';

    return (
        <div
            className={cn(
                'mx-auto mb-16 flex max-w-9/10 flex-col items-center justify-between gap-x-11 gap-y-4.5 md:mb-25.5 md:max-w-160 md:flex-row lg:mb-20 xl:mb-24.5',
                className,
            )}
        >
            <Input
                class="border-primary/50 h-10"
                placeholder={placeholder}
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(e.currentTarget.value)
                }
            />

            <button
                type="button"
                className="focus-visible:border-ring bg-foreground text-user-background hover:ring-footer-text focus-visible:ring-footer-text flex items-center justify-center gap-[0.5em] rounded-xl py-[0.5em] pr-[1em] pl-[1.5em] font-medium shadow-xs transition-[color,box-shadow,opacity] outline-none hover:ring-[3px] focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0"
            >
                Найти
                <Search className="size-5" />
            </button>
        </div>
    );
};

export default SearchBar;
