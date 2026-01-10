import { useModal } from '@/providers/modal-context';
import { cn } from '@/utils/cn';
import { ComponentChildren, CSSProperties } from 'preact';
import { FC } from 'preact/compat';

const AppSection: FC<{ className?: string; children: ComponentChildren, style?: CSSProperties }> = ({
    className,
    children,
    style
}) => {
    const { showModal } = useModal();

    return (
        <section
            inert={showModal.value}
            class={cn(
                'px-5 content-vis-auto first-of-type:pt-36 sm:px-15 first-of-type:sm:pt-42 md:text-xl lg:px-23 first-of-type:lg:pt-50 2xl:text-2xl',
                className,
            )}
            style={style}
        >
            {children}
        </section>
    );
};

export default AppSection;
