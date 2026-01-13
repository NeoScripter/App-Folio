import { useFetch } from '@/hooks/use-fetch';
import AdminLayout from '@/layouts/admin/admin-layout';
import AdminShellLayout from '@/layouts/admin/admin-shell-layout';
import ModalLayout from '@/layouts/admin/modal-layout';
import { ProjectType } from '@/lib/types/projects';
import { DeleteModalProvider } from '@/providers/delete-modal-context';
import { FC } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';
import ModuleUpsert from '../partials/module-upsert';
import ProjectModuleDelete from '../partials/project-module-delete';
import ProjectUpsert from '../partials/project-upsert';
import AccordionWrapper from './accordion-wrapper';

const EditProject: FC<{ slug: string }> = ({ slug }) => {
    const { fetchData, loading, errors } = useFetch();
    const [project, setProject] = useState<ProjectType | null>(null);
    const [visibleItem, setVisibleItem] = useState<number | null>(null);

    const handleAccordionClick = (idx: number) => {
        if (idx === visibleItem) {
            setVisibleItem(null);
        } else {
            setVisibleItem(idx);
        }
    };

    useEffect(() => {
        const fetchProject = () => {
            fetchData({
                url: `/api/projects/${slug}`,
                onSuccess: (data) => {
                    setProject(data.data);
                },
            });
        };

        fetchProject();

        document.addEventListener('itemDeleted', fetchProject);

        return () => document.removeEventListener('itemDeleted', fetchProject);
    }, []);

    if (errors != null) {
        console.error(errors);
    }

    return (
        <DeleteModalProvider>
            <AdminLayout title="Edit Project">
                <AdminShellLayout>
                    <AccordionWrapper
                        label="Project"
                        handleClick={() => handleAccordionClick(0)}
                        show={visibleItem === 0}
                    >
                        {errors != null ? (
                            <p>{errors.general}</p>
                        ) : loading || project == null ? (
                            'Loading...'
                        ) : (
                            <ProjectUpsert project={project} />
                        )}
                    </AccordionWrapper>
                    {project && (
                        <AccordionWrapper
                            key="newModule"
                            label="New Module"
                            handleClick={() => handleAccordionClick(1)}
                            show={visibleItem === 1}
                        >
                            <ModuleUpsert projectId={project.id} />
                        </AccordionWrapper>
                    )}
                    {project?.modules &&
                        project.modules.map((module, idx) => (
                            <AccordionWrapper
                                key={module.id}
                                label={`Module ${idx + 1}`}
                                handleClick={() =>
                                    handleAccordionClick(idx + 2)
                                }
                                show={visibleItem === idx + 2}
                            >
                                <ModuleUpsert
                                    module={module}
                                    projectId={project.id}
                                />
                            </AccordionWrapper>
                        ))}
                    <ModalLayout className="max-w-9/10 px-10 py-14 sm:max-w-100 lg:max-w-160">
                        <ProjectModuleDelete />
                    </ModalLayout>
                </AdminShellLayout>
            </AdminLayout>
        </DeleteModalProvider>
    );
};

export default EditProject;
