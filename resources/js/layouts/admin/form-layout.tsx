import { cn } from '@/utils/cn';
import { JSX } from 'preact';
import { FC } from 'preact/compat';

interface FormLayoutProps {
    onSubmit: () => void | Promise<void>;
    children: JSX.Element | JSX.Element[];
    className?: string;
}

const FormLayout: FC<FormLayoutProps> = ({ onSubmit, children, className }) => {
    async function handleSubmit(e: JSX.TargetedEvent<HTMLFormElement, Event>) {
        e.preventDefault();
        await onSubmit();
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={cn('max-w-160 space-y-4', className)}
        >
            {children}
        </form>
    );
};

export default FormLayout;
