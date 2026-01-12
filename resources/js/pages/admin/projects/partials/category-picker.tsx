import { useFetch } from '@/hooks/use-fetch';
import { NodeProps } from '@/lib/types/nodeProps';
import { ProjectCategoryType } from '@/lib/types/projects';
import { cn } from '@/utils/cn';
import { FC, useEffect, useState } from 'preact/compat';

type Props = NodeProps & {
    locale: 'en' | 'ru';
    onSelect: (category: { en: string; ru: string }) => void;
};

const CategoryPicker: FC<Props> = ({ className, locale, onSelect }) => {
    const { fetchData, loading, errors } = useFetch();
    const [categories, setCategories] = useState<ProjectCategoryType[]>([]);

    useEffect(() => {
        fetchData({
            url: '/api/categories',
            onSuccess: (data) => setCategories(data.data),
        });
    }, []);

    if (loading) {
        return <div class={cn('', className)}>loading...</div>;
    }

    if (errors) {
        console.error(errors);
        return null;
    }

    return (
        <div class={cn('flex flex-wrap gap-2', className)}>
            {categories.map((category) => (
                <button
                    type="button"
                    key={category.id}
                    class="rounded border px-3 py-1 hover:shadow-sm transition:shadow"
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
