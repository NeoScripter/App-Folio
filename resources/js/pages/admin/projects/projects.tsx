import AdminShellNav from '@/components/admin/nav/admin-shell-nav';
import Pagination from '@/components/admin/ui/pagination';
import useFetchProjects from '@/hooks/use-fetch-projects';
import AdminLayout from '@/layouts/admin/admin-layout';
import AdminShellLayout from '@/layouts/admin/admin-shell-layout';
import ModalLayout from '@/layouts/admin/modal-layout';
import { DeleteModalProvider } from '@/providers/delete-modal-context';
import { range } from '@/utils/range';
import { useState } from 'preact/hooks';
import ProjectCard, { ProjectCardSkeleton } from './partials/project-card';
import ProjectDelete from './partials/project-delete';
import SearchBox from './partials/search-box';

const Projects = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (val: string) => {
        handlePageClick(1);
        setSearchQuery(val);
    };

    const { projectData, errors, loading, projectsRef, handlePageClick } =
        useFetchProjects({ searchQuery });

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
                            {projectData?.data && projectData.data.length > 0
                                ? projectData.data.map((project) => (
                                      <ProjectCard
                                          key={project.id}
                                          project={project}
                                      />
                                  ))
                                : <p class="ml-4">No projects matching your search have been found</p>}
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
