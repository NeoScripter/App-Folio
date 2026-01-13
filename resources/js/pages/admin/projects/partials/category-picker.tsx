import { ValidationErrors } from '@/hooks/use-fetch';
import { NodeProps } from '@/lib/types/nodeProps';
import { ProjectCategoryType } from '@/lib/types/projects';
import { cn } from '@/utils/cn';
import { range } from '@/utils/range';
import { FC } from 'preact/compat';

type Props = NodeProps & {
    locale: 'en' | 'ru';
    loading: boolean;
    errors: ValidationErrors | null;
    categories: ProjectCategoryType[] | null;
    onSelect: (category: { en: string; ru: string }) => void;
};

const CategoryPicker: FC<Props> = ({
    className,
    locale,
    onSelect,
    loading,
    errors,
    categories,
}) => {
    if (loading) {
        return (
            <ul class="flex flex-wrap items-center gap-2">
                {' '}
                {range(0, 5).map((idx) => (
                    <li key={idx} class="skeleton rounded border px-3 py-1">
                        loremipsu
                    </li>
                ))}
            </ul>
        );
    }

    if (errors) {
        console.error(errors);
        return null;
    }

    if (!categories || categories.length === 0) return null;

    return (
        <div class={cn('flex flex-wrap gap-2', className)}>
            {categories.map((category) => (
                <button
                    type="button"
                    key={category.id}
                    class="hover:border-ring hover:ring-ring/50 rounded border px-3 py-1 transition-[color,box-shadow] hover:shadow-sm hover:ring-[3px]"
                    onClick={() =>
                        onSelect({
                            en: category.name.en,
                            ru: category.name.ru,
                        })
                    }
                >
                    {locale === 'en' ? category.name.en : category.name.ru}
                </button>
            ))}
        </div>
    );
};
export default CategoryPicker;
