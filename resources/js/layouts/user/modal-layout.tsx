import { useEscapeKey } from '@/hooks/use-escape-key';
import { useModal } from '@/providers/modal-context';
import { cn } from '@/utils/cn';
import { X } from 'lucide-preact';
import { ComponentChildren } from 'preact';
import { createPortal, FC, useEffect } from 'preact/compat';

const ModalLayout: FC<{
    className?: string;
    children?: ComponentChildren;
}> = ({ className, children }) => {
    const { showModal } = useModal();

    useEscapeKey(() => (showModal.value = false));

    const handleClick = (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.id === 'email-form-modal') {
            showModal.value = false;
        }
    };

    useEffect(() => {
        document.documentElement.style.overflowY = !showModal.value
            ? 'auto'
            : 'clip';

        return () => {
            document.documentElement.style.overflowY = 'auto';
        };
    }, [showModal.value]);

    return createPortal(
        <div
            onClick={handleClick}
            id="email-form-modal"
            class={cn(
                'size-screen fixed inset-0 z-20 flex flex-wrap overflow-y-auto bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out',
                {
                    'opacity-100': showModal.value,
                    'pointer-events-none opacity-0': !showModal.value,
                },
            )}
        >
            <div
                class={cn(
                    'bg-user-background relative m-auto w-full rounded-sm',
                    {
                        'animate-shrink': !showModal.value,
                        'animate-expand': showModal.value,
                    },

                    className,
                )}
            >
                <button
                    onClick={() => (showModal.value = false)}
                    type="button"
                    class="absolute top-5 right-5 flex size-6 sm:size-8 items-center justify-center"
                >
                    <span aria-hidden="true" class='absolute -inset-2'/ >
                    <X  class='size-full'/>
                </button>
                {children}
            </div>
        </div>,
        document.getElementById('portals')!,
    );
};

export default ModalLayout;
