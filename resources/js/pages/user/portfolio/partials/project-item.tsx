import { Anchor } from '@/components/user/ui/anchor';
import { Button } from '@/components/user/ui/button';
import FluidImage from '@/components/user/ui/fluid-image';
import LazyImage from '@/components/user/ui/lazy-image';
import { NodeProps } from '@/lib/types/nodeProps';
import { ProjectType } from '@/lib/types/projects';
import { locale } from '@/signals/locale';
import { cn } from '@/utils/cn';
import { FC } from 'preact/compat';

const ProjectItem: FC<NodeProps<{ project: ProjectType }>> = ({
    className,
    project,
}) => {
    const lang = locale.value === 'en' ? 'en' : 'ru';
    const img = project.image;
    return (
        <li
            className={cn(
                'px-4.5 pt-14.5 pb-16.5 md:-mx-4 md:px-12 md:pt-20.5 md:pb-20 lg:-mx-24 lg:flex lg:justify-between lg:gap-25.5 lg:px-28 lg:pt-18 lg:pb-18 2xl:px-48 2xl:pt-18 2xl:pb-18',
                className,
            )}
        >
            <div class="mb-12 md:flex md:items-start md:justify-between md:gap-15 lg:order-2 lg:mb-0 lg:block lg:max-w-1/2 lg:basis-full">
                {img && (
                    <FluidImage
                        parentClass="rounded-3xl md:max-w-2/5 md:order-2 lg:max-w-full"
                        alt={project.image.alt[lang]}
                        tiny={project.image.tiny}
                        dkWebp={project.image.tbWebp}
                        dkAvif={project.image.tbAvif}
                        tbWebp={project.image.tbWebp}
                        tbAvif={project.image.tbAvif}
                        mbWebp={project.image.mbWebp}
                        mbAvif={project.image.mbAvif}
                    />
                )}
                <ProjectInfo project={project} className="lg:hidden" />
            </div>
            <div class="lg:flex lg:basis-2/5 lg:flex-col lg:items-start lg:justify-between 2xl:basis-1/2">
                <div class="lg:mb-10">
                    <ProjectInfo
                        className="hidden lg:block"
                        project={project}
                    />
                </div>
                <div>
                    <p class="mb-12 lg:mb-7 xl:mb-13.5 xl:text-xl">
                        {project.attributes.description[lang]}
                    </p>

                    <Anchor
                        class="ml-auto md:mr-auto lg:ml-0"
                        href={`portfolio/${project.id}`}
                        variant="primary"
                    >
                        Перейти к проекту
                    </Anchor>
                </div>
            </div>
        </li>
    );
};

export default ProjectItem;

const ProjectInfo: FC<{ project: ProjectType; className?: string }> = ({
    project,
    className,
}) => {
    const lang = locale.value === 'en' ? 'en' : 'ru';
    return (
        <div className={cn('mt-7 mb-17.5 md:mt-0 md:mb-0', className)}>
            <span class="mb-4 block uppercase">
                {project.attributes.category[lang]}
            </span>
            <h2 class="mb-6 text-3xl font-semibold hyphens-auto md:mb-5 xl:text-4xl">
                {project.attributes.title[lang]}
            </h2>
            <ul class="flex flex-wrap gap-x-3 gap-y-3">
                {project.attributes.stacks[lang].map((stack) => (
                    <li
                        class="border-foreground flex items-center justify-center rounded-3xl border px-3 py-1"
                        key={stack}
                    >
                        {stack}
                    </li>
                ))}
            </ul>
        </div>
    );
};
