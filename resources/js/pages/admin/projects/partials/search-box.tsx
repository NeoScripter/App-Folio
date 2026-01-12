import Input from '@/components/auth/form/input';
import { NodeProps } from '@/lib/types/nodeProps';
import { cn } from '@/utils/cn';
import { ChangeEvent, FC } from 'preact/compat';

const SearchBox: FC<
    NodeProps<{ value: string; handleChange: (val: string) => void }>
> = ({ className, value, handleChange }) => {
    return (
        <div className={cn('mb-3 ml-4 flex max-w-100', className)}>
            <Input
                class="border-primary/50 h-10 text-lg!"
                type="search"
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(e.currentTarget.value)
                }
            />
        </div>
    );
};

export default SearchBox;
