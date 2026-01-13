import { useFetch } from '@/hooks/use-fetch';
import { ProjectCategoryType } from '@/lib/types/projects';
import { useEffect, useState } from 'preact/hooks';

const useFetchCategories = () => {
    const { fetchData, loading, errors } = useFetch();
    const [categories, setCategories] = useState<ProjectCategoryType[]>([]);

    useEffect(() => {
        fetchData({
            url: '/api/categories',
            onSuccess: (data) => setCategories(data.data),
        });
    }, []);

    return { categories, loading, errors };
};

export default useFetchCategories;
