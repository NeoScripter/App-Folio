import InputError from '@/components/auth/form/input-error';
import Label from '@/components/auth/form/label';
import { cn } from '@/utils/cn';
import { useId } from 'preact/hooks';
import MarkdownEditor from './markdown-editor';

type FormWysiwygProps = {
    label: string;
    className?: string;
    value: string;
    onInput: (value: string) => void;
    error?: string;
};

export function FormWysiwyg({
    label,
    className,
    error,
    onInput,
    value,
}: FormWysiwygProps) {
    const id = useId();
    return (
        <div className={cn('grid text-base content-start gap-4', className)}>
            <Label class="ml-1 text-base" htmlFor={id}>
                {label}
            </Label>
            <MarkdownEditor
                value={value}
                onChange={(val) => {
                    onInput(val);
                }}
            />

            {error && (
                <InputError class="ml-1 text-base" message={error || ''} />
            )}
        </div>
    );
}
