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
        const fetchProjects = () => {
            fetchData({
                url: `/api/projects?page=${currentPage}&latest=true`,
                onSuccess: (data) => {
                    setProjectData(data);
                },
            });
        };

        fetchProjects();

        document.addEventListener('itemDeleted', fetchProjects);

        return () => document.removeEventListener('itemDeleted', fetchProjects);
    }, [currentPage]);

    if (errors != null) {
        console.error(errors);
    }

    return (
        <DeleteModalProvider>
            <AdminLayout title="Projects">
                <AdminShellLayout>
                    <AdminShellNav href={'projects/create'} />

                    {projectData?.meta && (
                        <Pagination
                            className="sticky top-0"
                            onClick={handlePageClick}
                            meta={projectData.meta}
                        />
                    )}

                    {loading ? (
                        <ul className="space-y-6">
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
