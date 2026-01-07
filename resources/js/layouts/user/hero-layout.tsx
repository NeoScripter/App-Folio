import { NodeProps } from '@/lib/types/nodeProps';
import { cn } from '@/utils/cn';
import { FC } from 'preact/compat';
import AppSection from './app-section';

const HeroLayout: FC<NodeProps> = ({ className, children }) => {
    return (
        <AppSection
            className={cn(
                'relative isolate overflow-clip rounded-xl pt-12 pb-15.5 sm:pt-14 sm:pb-25 lg:pt-12 xl:pt-20.5 xl:pb-28',
                className,
            )}
        >
            {children}
        </AppSection>
    );
};

export default HeroLayout;
