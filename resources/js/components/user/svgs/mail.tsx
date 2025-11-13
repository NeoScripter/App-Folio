import { cn } from '@/utils/cn';
import { FC } from 'preact/compat';

const MailSvg: FC<{ className?: string }> = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class={cn('lucide lucide-mail-icon lucide-mail', className)}
        >
            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" class="group-hover:rotate-180" />
            <rect x="2" y="4" width="20" height="16" rx="2" />
        </svg>
    );
};

export default MailSvg;
