import { Button } from '@/components/auth/form/button';
import { cn } from '@/utils/cn';
import { LoaderCircle } from 'lucide-preact';
import { FC } from 'preact/compat';
import { Anchor } from '../ui/anchor';
import { ComponentChildren } from 'preact';

const FormBtn: FC<{
    loading: boolean;
    className?: string;
    cancelLink?: string;
    children?: ComponentChildren;
}> = ({ className, loading, cancelLink, children }) => {
    return (
        <div class="flex items-center gap-2">
            <Button
                type="submit"
                class={cn('w-fit', className)}
                disabled={loading}
            >
                {loading && <LoaderCircle class="h-4 w-4 animate-spin" />}
                Submit
            </Button>
            {cancelLink && (
                <Anchor href={cancelLink} variant="secondary">
                    Cancel
                </Anchor>
            )}
            {children}
        </div>
    );
};

export default FormBtn;
