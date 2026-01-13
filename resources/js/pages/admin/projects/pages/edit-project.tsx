import { useFetch } from '@/hooks/use-fetch';
import AdminLayout from '@/layouts/admin/admin-layout';
import AdminShellLayout from '@/layouts/admin/admin-shell-layout';
import { ProjectType } from '@/lib/types/projects';
import { FC } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';
import ProjectUpsert from '../partials/project-upsert';
import AccordionWrapper from './accordion-wrapper';

const EditProject: FC<{ slug: string }> = ({ slug }) => {
    const { fetchData, loading, errors } = useFetch();
    const [project, setProject] = useState<ProjectType | null>(null);
    const [visibleItem, setVisibleItem] = useState<number | null>(0);

    const handleAccordionClick = (idx: number) => {
        if (idx === visibleItem) {
            setVisibleItem(null);
        } else {
            setVisibleItem(idx);
        }
    };

    useEffect(() => {
        fetchData({
            url: `/api/projects/${slug}`,
            onSuccess: (data) => {
                setProject(data.data);
            },
        });
    }, []);

    if (errors != null) {
        console.error(errors);
    }

    return (
        <AdminLayout title="Edit Project">
            <AdminShellLayout>
                <AccordionWrapper
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
            </AdminShellLayout>
        </AdminLayout>
    );
};

export default EditProject;
