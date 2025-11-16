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
                'shadow-project max-w-90 justify-self-center overflow-clip rounded-md transition-transform duration-300 ease-in-out hover:scale-103 xl:max-w-100',
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
            <div class="px-5 pt-5 pb-7 sm:px-6 sm:pt-6">
                <h4 class="mb-5.5 text-2xl font-medium xl:text-2xl">
                    {project.attributes[`title${lang}`]}
                </h4>
                <p class="text-foreground/60 text-sm">
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
                'bg-muted project-slide border-accent-foreground/15 ease flex flex-col items-start gap-8 rounded-xl border py-7.5 pr-7 pl-6 select-none sm:flex-row sm:gap-10.5 sm:py-12 sm:pr-18 sm:pl-8 sm:text-base md:items-center lg:gap-12 lg:pt-12 lg:pr-17 lg:pb-18 lg:pl-10.5 lg:text-xl xl:pb-13',
            )}
        >
            <div class="skeleton size-32 shrink-0 animate-pulse rounded-full md:size-40 lg:size-51" />
            <div>
                <p class="skeleton mb-6">
                    Lorem ipsum dolor sit amet consectetur. In enim cursus odio
                    accumsan. Id leo urna velit neque mattis id tellus arcu
                    condimentum. Augue dictum dolor elementum convallis
                    dignissim malesuada commodo ultrices.
                </p>

                <p class="skeleton w-40 animate-pulse font-bold md:text-xl xl:text-2xl">
                    Lorem
                </p>
            </div>
        </li>
    );
};
