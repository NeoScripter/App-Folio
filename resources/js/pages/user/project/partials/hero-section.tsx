import { Anchor } from '@/components/user/ui/anchor';
import FluidImage from '@/components/user/ui/fluid-image';
import HeroLayout from '@/layouts/user/hero-layout';
import { ProjectType } from '@/lib/types/projects';
import { locale } from '@/signals/locale';
import { cn } from '@/utils/cn';
import { FC } from 'preact/compat';

const HeroSection: FC<{ project: ProjectType | null }> = ({ project }) => {
    const lang = locale.value === 'en' ? 'en' : 'ru';
    return (
        <HeroLayout>
            {project != null && (
                <>
                    <div class="mb-13 sm:mb-14 xl:mb-19.5 xl:flex 2xl:mb-22 xl:[&>*]:flex-[1_1_0]">
                        <ProjectInfo project={project} />
                        <ProjectDetails
                            className="hidden xl:block"
                            project={project}
                        />
                    </div>

                    {project.image && (
                        <FluidImage
                            parentClass="rounded-3xl sm:-mx-12 md:-mx-20 xl:-mx-20 sm:aspect-[2/1] xl:aspect-[10/4]"
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
                    <ProjectDetails className="xl:hidden" project={project} />
                </>
            )}
        </HeroLayout>
    );
};

export default HeroSection;

const ProjectInfo: FC<{ project: ProjectType; className?: string }> = ({
    project,
    className,
}) => {
    const lang = locale.value === 'en' ? 'en' : 'ru';
    return (
        <div className={cn('', className)}>
            <span class="mb-4 block text-xl uppercase sm:mb-4.5 sm:text-2xl xl:mb-5 xl:text-3xl">
                {project.attributes.category[lang]}
            </span>
            <h2 class="mb-7 text-4xl font-semibold hyphens-auto sm:mb-7.5 sm:text-6xl xl:mb-5.5 xl:text-7xl 2xl:mb-8">
                {project.attributes.title[lang]}
            </h2>
            <ul class="flex flex-wrap gap-3 xl:gap-4">
                {project.attributes.stacks[lang].map((stack) => (
                    <li
                        class="border-foreground flex items-center justify-center rounded-3xl border xl:px-4 xl:py-2 px-3 py-1"
                        key={stack}
                    >
                        {stack}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const ProjectDetails: FC<{ project: ProjectType; className?: string }> = ({
    project,
    className,
}) => {
    const lang = locale.value === 'en' ? 'en' : 'ru';

    return (
        <div className={cn('mt-14 xl:mt-0 xl:pl-19 xl:ml-19 xl:border-l xl:border-foreground 2xl:ml-24 2xl:pl-24 2xl:mt-6.5', className)}>
            <p class="mb-10 sm:mb-12 xl:mb-8.5 2xl:mb-10 text-base sm:text-xl 2xl:text-2xl">{project.attributes.description[lang]}</p>

            <Anchor class='ml-auto xl:ml-0' href={project.attributes.link} variant="primary">
                {lang === 'ru' ? 'Перейти на сайт' : 'Visit website'}
            </Anchor>
        </div>
    );
};
