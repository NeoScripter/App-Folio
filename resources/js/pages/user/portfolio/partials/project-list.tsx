import ApiError from '@/components/user/ui/api-error';
import Pagination from '@/components/user/ui/pagination';
import { useFetch } from '@/hooks/use-fetch';
import { NodeProps } from '@/lib/types/nodeProps';
import { ProjectResource } from '@/lib/types/projects';
import { cn } from '@/utils/cn';
import { range } from '@/utils/range';
import { useLocation } from 'preact-iso';
import { FC, useEffect, useRef, useState } from 'preact/compat';
import ProjectItem from './project-item';
import ProjectItemSkeleton from './project-item-skeleton';
import SearchBar from './search-bar';

const ProjectList: FC<NodeProps> = ({ className }) => {
    const { fetchData, loading, errors } = useFetch();
    const [projectData, setProjects] = useState<ProjectResource | null>(null);
    const { query } = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(() =>
        query?.page == null ? 1 : query.page,
    );
    const projectsRef = useRef<HTMLElement | null>(null);

    const handleInputChange = (val: string) => {
        setSearchQuery(val);
    };

    const handlePageClick = (newPage: number) => {
        if (projectData?.meta == null) return;
        const lastPage = projectData.meta.last_page;

        if (newPage > lastPage || newPage < 1) return;
        setCurrentPage(newPage);

        if (!projectsRef.current) return;

        projectsRef.current.scrollIntoView({
            block: 'start',
        });
    };

    useEffect(() => {
        fetchData({
            url: `/api/projects?page=${currentPage}`,
            onSuccess: (data) => {
                setProjects(data);
            },
        });
    }, [currentPage]);

    if (errors != null)
        return <ApiError resourceRu="проектов" resourceEn="projectData" />;

    return (
        <div className={cn(className)}>
            <SearchBar value={searchQuery} handleChange={handleInputChange} />
            <section ref={projectsRef} className="scroll-m-80">
                {projectData?.data != null && !loading ? (
                    <ul>
                        {projectData.data.map((project, idx) => (
                            <ProjectItem
                                key={project.id}
                                className={cn(
                                    idx % 2 === 0
                                        ? 'bg-muted'
                                        : 'flex-row-reverse [&>*]:md:flex-row-reverse [&>*]:lg:flex-col',
                                )}
                                project={project}
                            />
                        ))}
                    </ul>
                ) : (
                    <ul>
                        {range(0, 7).map((idx) => (
                            <ProjectItemSkeleton
                                className={cn(
                                    idx % 2 !== 0 &&
                                        'flex-row-reverse [&>*]:md:flex-row-reverse [&>*]:lg:flex-col',
                                )}
                                key={idx}
                            />
                        ))}
                    </ul>
                )}
            </section>

            {projectData?.meta && (
                <Pagination
                    className="mt-12.5 mb-13.5 md:mt-17.5 md:mb-27 xl:mt-13.5 xl:mb-21 2xl:mt-13.5 2xl:mb-21"
                    onClick={handlePageClick}
                    meta={projectData.meta}
                />
            )}
        </div>
    );
};

export default ProjectList;
