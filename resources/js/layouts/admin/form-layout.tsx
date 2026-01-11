import { cn } from '@/utils/cn';
import { JSX } from 'preact';
import { FC } from 'preact/compat';

interface FormLayoutProps {
    onSubmit: () => void | Promise<void>;
    children: JSX.Element | JSX.Element[];
    className?: string;
    hasFileUpload?: boolean;
}

const FormLayout: FC<FormLayoutProps> = ({
    onSubmit,
    children,
    className,
    hasFileUpload = false,
}) => {
    async function handleSubmit(e: JSX.TargetedEvent<HTMLFormElement, Event>) {
        e.preventDefault();
        await onSubmit();
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={cn('max-w-160 space-y-4', className)}
            {...(hasFileUpload && { encType: 'multipart/form-data' })}
        >
            {children}
        </form>
    );
};

export default FormLayout;
