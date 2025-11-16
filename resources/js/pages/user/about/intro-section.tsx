import SecondaryHeading from '@/components/user/ui/secondary-heading';
import AppSection from '@/layouts/user/app-section';
import { cn } from '@/utils/cn';
import { FC } from 'preact/compat';
import Stacks from './stacks';

const IntroSection: FC<{ className?: string }> = ({ className }) => {
    return (
        <AppSection
            className={cn(
                'py-14 sm:pt-19 sm:pb-12 lg:pt-17 lg:pb-22 xl:pb-18',
                className,
            )}
        >
            <SecondaryHeading className="xs:text-center xs:text-balance">
                Языки и фреймворки, которые я использую
            </SecondaryHeading>

            <Stacks />
        </AppSection>
    );
};

export default IntroSection;
