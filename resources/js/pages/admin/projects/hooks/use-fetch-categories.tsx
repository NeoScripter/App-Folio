import { useFetch } from '@/hooks/use-fetch';
import { ProjectCategoryType } from '@/lib/types/projects';
import { useEffect, useState } from 'preact/hooks';

type FetchCategoriesArgs = {
    categoryEn: string;
    categoryRu: string;
};

const useFetchCategories = ({
    categoryEn,
    categoryRu,
}: FetchCategoriesArgs) => {
    const { fetchData, loading, errors } = useFetch();
    const [categories, setCategories] = useState<ProjectCategoryType[]>([]);

    let invalidCategoryId = null;

    for (const { id, name } of categories) {
        if (
            (categoryEn === name.en || categoryRu === name.ru) &&
            (categoryEn !== name.en || categoryRu !== name.ru)
        ) {
            invalidCategoryId = id;
        }
    }

    useEffect(() => {
        fetchData({
            url: '/api/categories',
            onSuccess: (data) => setCategories(data.data),
        });
    }, []);

    return { categories, loading, errors, invalidCategoryId };
};

export default useFetchCategories;
