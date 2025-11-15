import ApiError from '@/components/user/ui/api-error';
import { useFetch } from '@/hooks/use-fetch';
import { ProjectResource, ProjectType } from '@/lib/types/projects';
import { locale } from '@/signals/locale';
import { cn } from '@/utils/cn';
import { range } from '@/utils/range';
import { FC, useEffect, useState } from 'preact/compat';
import ProjectCard, { ProjectCardSkeleton } from './project-card';

const Projects: FC<{ className?: string }> = ({ className }) => {
    const { fetchData, loading, errors } = useFetch();
    const [projects, setProjects] = useState<ProjectType[] | null>(null);

    useEffect(() => {
        fetchData({
            url: '/api/projects',
            onSuccess: (data) => {
                setProjects(data.data);
            },
        });
    }, []);

    const listLabel = locale.value === 'ru' ? 'проекты' : 'projects';

    if (errors != null)
        return <ApiError resourceRu="проектов" resourceEn="projects" />;
    return (
        <div>
            <div className="relative mt-16 sm:mt-26 lg:mt-28">
                <ul
                    className={cn(
                        'grid gap-15 lg:gap-15 sm:gap-6.5 place-content-center sm:grid-cols-2 xl:grid-cols-3',
                    )}
                    role="tablist"
                    aria-label={listLabel}
                    aria-live="polite"
                >
                    {!loading
                        ? projects?.slice(0,6).map((project, idx) => (
                              <ProjectCard key={project.id} project={project} />
                          ))
                        : range(0, 8).map((skeleton) => (
                              <ProjectCardSkeleton
                                  key={`project-skeleton-${skeleton}`}
                              />
                          ))}
                </ul>
            </div>
        </div>
    );
};

export default Projects;
