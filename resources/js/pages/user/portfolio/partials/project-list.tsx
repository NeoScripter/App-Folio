import ApiError from '@/components/user/ui/api-error';
import { useFetch } from '@/hooks/use-fetch';
import { NodeProps } from '@/lib/types/nodeProps';
import { ProjectResource } from '@/lib/types/projects';
import { cn } from '@/utils/cn';
import { FC, useEffect, useState } from 'preact/compat';
import ProjectItem from './project-item';
import SearchBar from './search-bar';

const ProjectList: FC<NodeProps> = ({ className }) => {
    const { fetchData, loading, errors } = useFetch();
    const [projects, setProjects] = useState<ProjectResource | null>(null);

    useEffect(() => {
        fetchData({
            url: '/api/projects',
            onSuccess: (data) => {
                setProjects(data);
            },
        });
    }, []);

    console.log(projects);

    if (errors != null)
        return <ApiError resourceRu="проектов" resourceEn="projects" />;

    return (
        <div className={cn('', className)}>
            <SearchBar />
            <section>
                {projects != null && (
                    <ul>
                        {projects.data.map((project, idx) => (
                            <ProjectItem key={project.id} className={cn(idx % 2 === 0 ? 'bg-muted' : 'flex-row-reverse')} project={project} />
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
};

export default ProjectList;
