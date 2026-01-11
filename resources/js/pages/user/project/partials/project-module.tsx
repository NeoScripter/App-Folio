import FluidImage from '@/components/user/ui/fluid-image';
import AppSection from '@/layouts/user/app-section';
import { ProjectModuleType } from '@/lib/types/project-module';
import { locale } from '@/signals/locale';
import { cn } from '@/utils/cn';
import { FC } from 'preact/compat';

const ProjectModule: FC<{ className?: string; module: ProjectModuleType }> = ({
    className,
    module,
}) => {
    const type = module.attributes.type;
    return (
        <AppSection
            className={cn('px-0 sm:px-0 sm:text-xl lg:px-0', className)}
        >
            <div
                className={cn('pt-15 pb-13.5 sm:pt-20 sm:pb-18', {
                    'lg:items-start': type === 'two_image_split',
                    'lg:items-center': type === 'one_image_split',
                    'lg:flex lg:gap-19 2xl:gap-21':
                        type === 'one_image_split' ||
                        type === 'two_image_split',
                })}
            >
                {type !== 'only_text' && (
                    <div
                        className={cn('mb-13.5 sm:mb-16.5', {
                            'flex flex-col items-center gap-6 sm:gap-11.5 lg:gap-7':
                                type === 'two_image_split' ||
                                type === 'two_image_block',
                            'lg:mb-12.5 lg:flex-row 2xl:mb-17.5':
                                type === 'two_image_block',
                            'lg:mb-0':
                                type === 'one_image_split' ||
                                type === 'two_image_split',
                            'lg:basis-1/3 lg:order-2':
                                type === 'one_image_split',
                            'lg:flex-[1_0_0]':
                                type === 'two_image_split',
                        })}
                    >
                        {module.firstImage && (
                            <FluidImage
                                parentClass={cn('w-full rounded-sm', {
                                })}
                                alt={module.firstImage.alt[locale.value]}
                                tiny={module.firstImage.tiny}
                                dkWebp={module.firstImage.tbWebp}
                                dkAvif={module.firstImage.tbAvif}
                                tbWebp={module.firstImage.tbWebp}
                                tbAvif={module.firstImage.tbAvif}
                                mbWebp={module.firstImage.mbWebp}
                                mbAvif={module.firstImage.mbAvif}
                            />
                        )}
                        {module.secondImage && (
                            <FluidImage
                                parentClass="rounded-sm w-full"
                                alt={module.secondImage.alt[locale.value]}
                                tiny={module.secondImage.tiny}
                                dkWebp={module.secondImage.tbWebp}
                                dkAvif={module.secondImage.tbAvif}
                                tbWebp={module.secondImage.tbWebp}
                                tbAvif={module.secondImage.tbAvif}
                                mbWebp={module.secondImage.mbWebp}
                                mbAvif={module.secondImage.mbAvif}
                            />
                        )}
                    </div>
                )}
                <div
                    className={cn({
                        'lg:basis-2/3':
                            type === 'one_image_split',
                        'lg:flex-[1_0_0]':
                            type === 'two_image_split',
                    })}
                >
                    {module.attributes.heading && (
                        <h3 className="mb-5.5 font-bold">
                            {module.attributes.heading[locale.value]}
                        </h3>
                    )}

                    <div
                        dangerouslySetInnerHTML={{
                            __html: module.attributes.html[locale.value],
                        }}
                    />
                </div>
            </div>
        </AppSection>
    );
};

export default ProjectModule;
