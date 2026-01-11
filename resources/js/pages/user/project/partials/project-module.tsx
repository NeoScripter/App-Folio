import AppSection from '@/layouts/user/app-section';
import { ProjectModuleType } from '@/lib/types/project-module';
import { locale } from '@/signals/locale';
import { cn } from '@/utils/cn';
import { FC } from 'preact/compat';

const ProjectModule: FC<{ className?: string; module: ProjectModuleType }> = ({
    className,
    module,
}) => {
    return (
        <AppSection className={cn('sm:text-xl px-0 sm:px-0 lg:px-0', className)}>
            <div className="pb-13.5 pt-15 sm:pb-18 sm:pt-20">
                {module.attributes.heading && (
                    <h3 className="mb-5.5 font-bold">{module.attributes.heading[locale.value]}</h3>
                )}

                <div
                    dangerouslySetInnerHTML={{
                        __html: module.attributes.html[locale.value],
                    }}
                />
            </div>
        </AppSection>
    );
};

export default ProjectModule;
