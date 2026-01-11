import Input from '@/components/auth/form/input';
import InputError from '@/components/auth/form/input-error';
import Label from '@/components/auth/form/label';
import { cn } from '@/utils/cn';
import { FC, useId } from 'preact/compat';

interface FormInputProps {
    label: string;
    value: string;
    onInput: (value: string) => void;
    error?: string;
    required?: boolean;
    className?: string;
}

const FormInput: FC<FormInputProps> = ({
    label,
    value,
    onInput,
    error,
    required = false,
    className,
}) => {
    const id = useId();

    return (
        <div class={cn('grid gap-2', className)}>
            <Label class="ml-1 text-base" htmlFor={id}>
                {label}
            </Label>
            <Input
                id={id}
                required={required}
                class="text-base!"
                value={value}
                onInput={(e) => {
                    onInput((e.target as HTMLTextAreaElement).value);
                }}
            />
            <InputError class="ml-1 text-base" message={error || ''} />
        </div>
    );
};

export default FormInput;
