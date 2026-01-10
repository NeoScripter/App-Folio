import ApiError from '@/components/user/ui/api-error';
import { ProjectType } from '@/lib/types/projects';
import { locale } from '@/signals/locale';
import { cn } from '@/utils/cn';
import { range } from '@/utils/range';
import { FC } from 'preact/compat';
import { ValidationErrors } from '@/hooks/use-fetch';
import ProjectCard, { ProjectCardSkeleton } from './project-card';

const Projects: FC<{
    className?: string;
    projects: ProjectType[] | null;
    loading: boolean;
    errors: ValidationErrors | null;
}> = ({ className, projects, loading, errors }) => {
    const listLabel = locale.value === 'ru' ? 'проекты' : 'projects';

    if (errors != null)
        return <ApiError resourceRu="проектов" resourceEn="projects" />;
    return (
        <div className="relative z-10">
            <div className="relative mt-16 sm:mt-26 lg:mt-28">
                <ul
                    className={cn(
                        'grid place-content-center gap-y-15 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3 xl:gap-6 2xl:gap-15',
                        className
                    )}
                    role="tablist"
                    aria-label={listLabel}
                    aria-live="polite"
                >
                    {!loading
                        ? projects
                              ?.slice(0, 6)
                              .map((project) => (
                                  <ProjectCard
                                      key={project.id}
                                      project={project}
                                  />
                              ))
                        : range(0, 6).map((skeleton) => (
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
