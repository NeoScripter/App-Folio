import { Button } from '@/components/auth/form/button';
import { NodeProps } from '@/lib/types/nodeProps';
import { cn } from '@/utils/cn';
import { FC } from 'preact/compat';

const AccordionWrapper: FC<
    NodeProps<{ show?: boolean; handleClick: () => void }>
> = ({ children, show = false, handleClick }) => {
    return (
        <div>
            <Button onClick={handleClick}>{show ? 'Hide' : 'Show'}</Button>
            <div
                class={cn(
                    'mt-4 grid w-fit transition-[grid-template-rows,padding] duration-500 ease-in-out',
                    show
                        ? 'border-input grid-rows-[1fr] rounded-md border p-4'
                        : 'grid-rows-[0fr]',
                )}
            >
                <div class="overflow-hidden">{children}</div>
            </div>
        </div>
    );
};

export default AccordionWrapper;
