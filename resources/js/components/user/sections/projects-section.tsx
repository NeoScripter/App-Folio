import PrimaryLink from '@/components/user/ui/primary-link';
import SecondaryHeading from '@/components/user/ui/secondary-heading';
import { useFetch } from '@/hooks/use-fetch';
import AppSection from '@/layouts/user/app-section';
import { ProjectType } from '@/lib/types/projects';
import { cn } from '@/utils/cn';
import { FC, useEffect, useState } from 'preact/compat';
import Projects from './projects';

const ProjectsSection: FC<{
    className?: string;
    title: string;
    excludedId?: number;
}> = ({ className, title, excludedId }) => {
    const { fetchData, loading, errors } = useFetch();
    const [projects, setProjects] = useState<ProjectType[] | null>(null);

    useEffect(() => {
        let req = '/api/projects?limit=3';

        if (excludedId != null) {
            req += `${req}&exclude=${excludedId}`;
        }
        fetchData({
            url: req,
            onSuccess: (data) => {
                setProjects(data.data);
            },
        });
    }, []);

    return (
        <AppSection
            className={cn(
                'py-14 sm:px-4 sm:pt-19 sm:pb-12 lg:pt-17 lg:pb-22 xl:px-0 xl:pb-18',
                className,
            )}
        >
            <div className="xl:flex xl:items-baseline xl:justify-between">
                <SecondaryHeading className="xs:text-center xs:text-balance text-center text-4xl xl:text-5xl">
                    {title}
                </SecondaryHeading>
                <PrimaryLink
                    href="/portfolio"
                    className="mx-auto mt-22 mr-0 hidden w-fit xl:flex"
                >
                    На страницу проектов
                </PrimaryLink>
            </div>

            <Projects
                errors={errors}
                projects={projects}
                loading={loading}
                className="sm:grid-cols-4 sm:*:col-span-2 sm:*:last-of-type:col-start-2 xl:grid-cols-3 xl:*:col-span-1 xl:*:last-of-type:col-start-auto"
            />

            <PrimaryLink
                href="/portfolio"
                className="mx-auto mt-22 w-fit xl:hidden"
            >
                На страницу проектов
            </PrimaryLink>
        </AppSection>
    );
};

export default ProjectsSection;
