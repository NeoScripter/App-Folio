import { Anchor } from '@/components/user/ui/anchor';
import FluidImage from '@/components/user/ui/fluid-image';
import HeroLayout from '@/layouts/user/hero-layout';
import { ProjectType } from '@/lib/types/projects';
import { locale } from '@/signals/locale';
import { cn } from '@/utils/cn';
import { range } from '@/utils/range';
import { FC } from 'preact/compat';

const HeroSection: FC<{ project: ProjectType | null; loading: boolean }> = ({
    project,
    loading,
}) => {
    const lang = locale.value === 'en' ? 'en' : 'ru';

    return (
        <HeroLayout className="full-bleed-wrapper pb-10 sm:pb-12 xl:pb-10 2xl:pb-12 full-bleed px-0 sm:px-0 lg:px-0">
            {loading || project == null ? (
                <>
                    <div class="mb-13 sm:mb-14 xl:mb-19.5 xl:flex 2xl:mb-22 xl:[&>*]:flex-[1_1_0]">
                        <ProjectInfoSkeleton />
                        <ProjectDetailsSkeleton className="hidden xl:block" />
                    </div>

                    <div className="skeleton full-bleed size-full rounded-3xl sm:aspect-2/1 xl:aspect-10/4"></div>
                    <ProjectDetailsSkeleton className="xl:hidden" />
                </>
            ) : (
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
                            parentClass="full-bleed px-4 sm:px-4.5 2xl:px-24"
                            imgClass="rounded-3xl sm:aspect-2/1 xl:aspect-10/4"
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
                        class="border-foreground flex items-center justify-center rounded-3xl border px-3 py-1 xl:px-4 xl:py-2"
                        key={stack}
                    >
                        {stack}
                    </li>
                ))}
            </ul>
        </div>
    );
};
const ProjectInfoSkeleton = () => {
    return (
        <div>
            <span class="skeleton mb-4 block w-fit rounded-sm text-xl uppercase sm:mb-4.5 sm:text-2xl xl:mb-5 xl:text-3xl">
                Lorem ipsum
            </span>
            <h2 class="skeleton mb-7 rounded-sm text-4xl font-semibold hyphens-auto sm:mb-7.5 sm:text-6xl xl:mb-5.5 xl:text-7xl 2xl:mb-8">
                Lorem ipsum dummy text
            </h2>
            <ul class="flex flex-wrap gap-3 xl:gap-4">
                {range(0, 6).map((idx) => (
                    <li
                        class="skeleton flex items-center justify-center rounded-3xl px-4 py-2 xl:px-5 xl:py-3"
                        key={idx}
                    >
                        Lorem
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
        <div
            className={cn(
                'xl:border-foreground mt-14 xl:mt-0 xl:ml-19 xl:border-l xl:pl-19 2xl:mt-6.5 2xl:ml-24 2xl:pl-24',
                className,
            )}
        >
            <p class="mb-10 text-base sm:mb-12 sm:text-xl xl:mb-8.5 2xl:mb-10 2xl:text-2xl">
                {project.attributes.description[lang]}
            </p>

            <Anchor
                class="ml-auto xl:ml-0"
                href={project.attributes.link}
                variant="primary"
            >
                {lang === 'ru' ? 'Перейти на сайт' : 'Visit website'}
            </Anchor>
        </div>
    );
};

const ProjectDetailsSkeleton: FC<{ className: string }> = ({ className }) => {
    return (
        <div
            className={cn(
                'xl:border-foreground mt-14 xl:mt-0 xl:ml-19 xl:border-l xl:pl-19 2xl:mt-6.5 2xl:ml-24 2xl:pl-24',
                className,
            )}
        >
            <p class="skeleton mb-10 rounded-sm text-base sm:mb-12 sm:text-xl xl:mb-8.5 2xl:mb-10 2xl:text-2xl">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut et
                consequatur illo necessitatibus quasi rerum aspernatur dolorum
                tenetur placeat molestiae, blanditiis assumenda delectus facilis
                magni dolorem consequuntur voluptatibus at culpa asperiores
                ipsam tempore maxime odio itaque ad. Quidem, labore accusamus?
            </p>

            <div className="skeleton ml-auto w-fit rounded-sm py-2 xl:ml-0">
                Lorem ipsum Lorem ipsum
            </div>
        </div>
    );
};
