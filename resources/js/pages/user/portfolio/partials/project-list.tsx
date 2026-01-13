import ApiError from '@/components/user/ui/api-error';
import EmptySearch from '@/components/user/ui/empty-search';
import Pagination from '@/components/user/ui/pagination';
import useFetchProjects from '@/hooks/use-fetch-projects';
import { NodeProps } from '@/lib/types/nodeProps';
import { cn } from '@/utils/cn';
import { range } from '@/utils/range';
import { FC, JSX, useState } from 'preact/compat';
import ProjectItem from './project-item';
import ProjectItemSkeleton from './project-item-skeleton';
import SearchBar from './search-bar';

const ProjectList: FC<NodeProps> = ({ className }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [debounceQuery, setDebounceQuery] = useState('');

    const { projectData, errors, loading, projectsRef, handlePageClick } =
        useFetchProjects({ searchQuery: debounceQuery });

    const handleInputChange = (val: string) => {
        setSearchQuery(val);
    };

    const handleSeachSubmit = (
        e: JSX.TargetedEvent<HTMLFormElement, Event>,
    ) => {
        e.preventDefault();
        handlePageClick(1);
        setDebounceQuery(searchQuery);
    };

    if (errors != null)
        return <ApiError resourceRu="проектов" resourceEn="projectData" />;

    return (
        <div className={cn(className)}>
            <SearchBar
                handleSubmit={handleSeachSubmit}
                value={searchQuery}
                handleChange={handleInputChange}
            />
            <section ref={projectsRef} className="scroll-m-80">
                {projectData?.data != null && !loading ? (
                    projectData.data.length > 0 ? (
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
                        <EmptySearch />
                    )
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
