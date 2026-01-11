import { Button } from '@/components/auth/form/button';
import { cn } from '@/utils/cn';
import { LoaderCircle } from 'lucide-preact';
import { FC } from 'preact/compat';
import { Anchor } from '../ui/anchor';

const FormBtn: FC<{
    loading: boolean;
    className?: string;
    cancelLink?: string;
}> = ({ className, loading, cancelLink }) => {
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
        </div>
    );
};

export default FormBtn;
