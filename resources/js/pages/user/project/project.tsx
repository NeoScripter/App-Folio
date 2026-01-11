import ProjectsSection from '@/components/user/sections/projects-section';
import ApiError from '@/components/user/ui/api-error';
import AppTitle from '@/components/user/ui/app-title';
import { useFetch } from '@/hooks/use-fetch';
import AppLayout from '@/layouts/user/app-layout';
import { ProjectType } from '@/lib/types/projects';
import { cn } from '@/utils/cn';
import { FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import HeroSection from './partials/hero-section';
import ProjectModule from './partials/project-module';

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
            <AppLayout variant="ghost" className="mt-40 px-5">
                <AppTitle titleEn="Error" titleRu="Ошибка" />
                <ApiError resourceRu="проекта" resourceEn="project" />
            </AppLayout>
        );

    return (
        <AppLayout
            className="full-bleed-wrapper md:px-0 xl:px-0"
            variant="ghost"
        >
            {project && (
                <AppTitle
                    titleEn={project.attributes.title.en}
                    titleRu={project.attributes.title.ru}
                />
            )}
            <HeroSection loading={loading} project={project} />
            {project?.modules?.map((module, idx) => (
                <ProjectModule
                    key={module.id}
                    className={cn(
                        idx % 2 === 0 &&
                            'bg-muted full-bleed full-bleed-padding',
                    )}
                    module={module}
                />
            ))}
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
