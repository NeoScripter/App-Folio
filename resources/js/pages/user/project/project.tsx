import ProjectsSection from '@/components/user/sections/projects-section';
import { useFetch } from '@/hooks/use-fetch';
import AppLayout from '@/layouts/user/app-layout';
import { ProjectType } from '@/lib/types/projects';
import { pageTitle } from '@/signals/page-title';
import { FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import HeroSection from './partials/hero-section';

interface ProjectProps {
    slug: string;
}
const Project: FunctionalComponent<ProjectProps> = ({ slug }) => {
    const { fetchData, loading, errors } = useFetch();
    const [project, setProject] = useState<ProjectType | null>(null);


    useEffect(() => {
        fetchData({
            url: `/api/projects/{slug}`,
            onSuccess: (data) => {
                setProject(data.data);
            },
        });
    }, []);
    return (
        <AppLayout variant="ghost">
            <HeroSection />
            <ProjectsSection title="Другие проекты" />
        </AppLayout>
    );
};

export default Project;
