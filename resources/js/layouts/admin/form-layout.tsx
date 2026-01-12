import { Button } from '@/components/auth/form/button';
import { cn } from '@/utils/cn';
import { Save, SaveAll } from 'lucide-preact';
import { JSX } from 'preact';
import { FC } from 'preact/compat';

interface FormLayoutProps {
    onSubmit: () => void | Promise<void>;
    children: JSX.Element | JSX.Element[];
    className?: string;
    hasFileUpload?: boolean;
    handleBackupClick?: () => void;
}

const FormLayout: FC<FormLayoutProps> = ({
    onSubmit,
    children,
    className,
    hasFileUpload = false,
    handleBackupClick,
}) => {
    async function handleSubmit(e: JSX.TargetedEvent<HTMLFormElement, Event>) {
        e.preventDefault();
        await onSubmit();
    }

    return (
        <div>
            {handleBackupClick && (
                <Button
                    onClick={handleBackupClick}
                    variant="default"
                    class="mb-6 pr-5!"
                >
                    <Save />
                    Restore
                </Button>
            )}
            <form
                onSubmit={handleSubmit}
                className={cn('max-w-160 space-y-4', className)}
                {...(hasFileUpload && { encType: 'multipart/form-data' })}
            >
                {children}
            </form>
        </div>
    );
};

export default FormLayout;
