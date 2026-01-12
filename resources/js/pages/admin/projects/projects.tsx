import AdminShellNav from '@/components/admin/nav/admin-shell-nav';
import Pagination from '@/components/admin/ui/pagination';
import { useFetch } from '@/hooks/use-fetch';
import AdminLayout from '@/layouts/admin/admin-layout';
import AdminShellLayout from '@/layouts/admin/admin-shell-layout';
import ModalLayout from '@/layouts/admin/modal-layout';
import { ProjectResource } from '@/lib/types/projects';
import { DeleteModalProvider } from '@/providers/delete-modal-context';
import { range } from '@/utils/range';
import { useLocation } from 'preact-iso';
import { useEffect, useRef, useState } from 'preact/hooks';
import ProjectCard, { ProjectCardSkeleton } from './partials/project-card';
import ProjectDelete from './partials/project-delete';
import SearchBox from './partials/search-box';

const Projects = () => {
    const { fetchData, loading, errors } = useFetch();
    const [projectData, setProjectData] = useState<ProjectResource | null>(
        null,
    );
    const { query } = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(() =>
        query?.page == null ? 1 : query.page,
    );
    const projectsRef = useRef<HTMLUListElement | null>(null);

    const handleInputChange = (val: string) => {
        setCurrentPage(1);
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
        const fetchProjects = () => {
            fetchData({
                url: `/api/projects?page=${currentPage}&latest=true&search=${searchQuery}`,
                onSuccess: (data) => {
                    setProjectData(data);
                },
            });
        };

        fetchProjects();

        document.addEventListener('itemDeleted', fetchProjects);

        return () => document.removeEventListener('itemDeleted', fetchProjects);
    }, [currentPage, searchQuery]);

    if (errors != null) {
        console.error(errors);
    }

    return (
        <DeleteModalProvider>
            <AdminLayout title="Projects">
                <AdminShellLayout>
                    <AdminShellNav href={'projects/create'} />

                    {projectData?.meta && (
                        <div className="bg-background sticky top-0 z-10">
                            <Pagination
                                onClick={handlePageClick}
                                meta={projectData.meta}
                            />
                            <SearchBox
                                value={searchQuery}
                                handleChange={handleInputChange}
                            />
                        </div>
                    )}

                    {loading ? (
                        <ul ref={projectsRef} className="space-y-6">
                            {range(0, 8).map((idx) => (
                                <ProjectCardSkeleton key={idx} />
                            ))}
                        </ul>
                    ) : (
                        <ul className="space-y-6">
                            {projectData?.data &&
                                projectData.data.map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                    />
                                ))}
                        </ul>
                    )}
                    <ModalLayout className="max-w-9/10 px-10 py-14 sm:max-w-100 lg:max-w-160">
                        <ProjectDelete />
                    </ModalLayout>
                </AdminShellLayout>
            </AdminLayout>
        </DeleteModalProvider>
    );
};

export default Projects;
