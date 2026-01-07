import LazyImage from '@/components/user/ui/lazy-image';
import { ProjectType } from '@/lib/types/projects';
import { appearance } from '@/signals/appearance';
import { locale } from '@/signals/locale';
import { cn } from '@/utils/cn';
import { FC } from 'preact/compat';

const ProjectCard: FC<{ project: ProjectType }> = ({ project }) => {
    const lang = locale.value === 'ru' ? 'Ru' : 'En';

    return (
        <li
            class={cn(
                'shadow-project justify-self-center overflow-clip rounded-md transition-transform duration-300 ease-in-out select-none hover:scale-103',
                appearance.value === 'dark' && 'bg-muted',
            )}
        >
            {project.image && (
                <div class="group relative">
                    <LazyImage
                        parentClass="rounded-md aspect-5/6"
                        alt={project.image[`alt${lang}`]}
                        tinyImg={project.image.tinyPath}
                        img={project.image.path}
                    />
                    <span
                        aria-hidden="true"
                        class="shine-element block group-hover:animate-[shine_750ms]"
                    />
                </div>
            )}
            <div class="px-5 pt-5 pb-7 sm:px-6 sm:pt-6 xl:pt-8 md:px-7 xl:px-8">
                <h4 class="mb-5.5 text-2xl font-medium xl:mb-7 md:text-3xl 2xl:text-4xl hyphens-auto">
                    {project.attributes[`title${lang}`]}
                </h4>
                <p class="text-foreground/60 text-sm md:text-base xl:text-lg">
                    {project.attributes[`description${lang}`]}
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
