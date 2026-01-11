import ProjectsSection from '@/components/user/sections/projects-section';
import ApiError from '@/components/user/ui/api-error';
import { useFetch } from '@/hooks/use-fetch';
import AppLayout from '@/layouts/user/app-layout';
import { ProjectType } from '@/lib/types/projects';
import { FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import HeroSection from './partials/hero-section';

interface ProjectProps {
    slug: string;
}
const Project: FunctionalComponent<ProjectProps> = ({ slug }) => {
    const { fetchData, loading, errors } = useFetch();
    const [project, setProject] = useState<ProjectType | null>(null);

    useEffect(() => {
        fetchData({
            url: `/api/projects/${slug}`,
            onSuccess: (data) => {
                setProject(data.data);
            },
        });
    }, []);

    console.log(project);

    if (errors != null)
        return (
            <AppLayout variant="ghost" className='mt-40 px-5'>
                <ApiError resourceRu="проекта" resourceEn="project" />
            </AppLayout>
        );

    return (
        <AppLayout variant="ghost">
            <HeroSection loading={loading} project={project} />
            {project && (
                <ProjectsSection
                    title="Другие проекты"
                    excludedId={project.id}
                />
            )}
        </AppLayout>
    );
};

export default Project;
