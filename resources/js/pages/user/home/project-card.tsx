import FluidImage from '@/components/user/ui/fluid-image';
import { ProjectType } from '@/lib/types/projects';
import { effectiveTheme } from '@/signals/appearance';
import { locale } from '@/signals/locale';
import { cn } from '@/utils/cn';
import { FC } from 'preact/compat';

const ProjectCard: FC<{ project: ProjectType }> = ({ project }) => {
    const lang = locale.value === 'ru' ? 'ru' : 'en';

    return (
        <li
            class={cn(
                'shadow-project relative isolate justify-self-center overflow-clip rounded-md transition-transform duration-300 ease-in-out select-none focus-within:scale-103 focus-within:ring-2 focus-within:ring-blue-500 hover:scale-103',
                effectiveTheme() === 'dark' && 'bg-muted',
            )}
        >
            {project.image && (
                <div class="group relative">
                    <FluidImage
                        parentClass="rounded-md aspect-5/6"
                        alt={project.image.alt[lang]}
                        dkWebp={project.image.mbWebp}
                        dkAvif={project.image.mbAvif}
                        tbWebp={project.image.mbWebp}
                        tbAvif={project.image.mbAvif}
                        mbWebp={project.image.mbWebp}
                        mbAvif={project.image.mbAvif}
                        tiny={project.image.tiny}
                    />
                    <a
                        href={`portfolio/${project.id}`}
                        class="absolute inset-0 z-1 block size-full focus:outline-none"
                    ></a>
                    <span
                        aria-hidden="true"
                        class="shine-element block group-hover:animate-[shine_750ms]"
                    />
                </div>
            )}
            <div class="px-5 pt-5 pb-7 sm:px-6 sm:pt-6 md:px-7 xl:px-8 xl:pt-8">
                <h4 class="mb-5.5 text-2xl font-medium hyphens-auto md:text-3xl xl:mb-7 2xl:text-4xl">
                    {project.attributes.title[lang]}
                </h4>
                <p class="text-foreground/60 ellipsis-multiline text-sm md:text-base xl:text-lg">
                    {project.attributes.description[lang]}
                </p>
            </div>
        </li>
    );
};

export default ProjectCard;

export const ProjectCardSkeleton = () => {
    return (
        <li
            class={cn(
                'shadow-project max-w-90 justify-self-center overflow-clip rounded-md select-none xl:max-w-100',
            )}
        >
            <div class="skeleton aspect-5/6 w-full rounded-md" />

            <div class="px-5 pt-5 pb-7 text-transparent sm:px-6 sm:pt-6">
                <h4 class="skeleton mb-5.5 text-2xl font-medium xl:text-2xl">
                    Lorem ipsum
                </h4>
                <p class="skeleton text-sm">
                    Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                    Lorem ipsum Lorem ipsum
                </p>
            </div>
        </li>
    );
};
