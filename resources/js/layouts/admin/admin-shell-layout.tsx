import { NodeProps } from '@/lib/types/nodeProps';
import { cn } from '@/utils/cn';
import { FC } from 'preact/compat';

const AdminShellLayout: FC<NodeProps> = ({ className, children }) => {
    return (
        <div
            className={cn(
                'flex h-full flex-1 flex-col gap-4 rounded-xl p-4',
                className,
            )}
        >
            {children}
        </div>
    );
};

export default AdminShellLayout;
