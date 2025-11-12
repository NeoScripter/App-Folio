import { FaqType } from '@/lib/types/faqs';
import { locale } from '@/signals/locale';
import { cn } from '@/utils/cn';
import { FC } from 'preact/compat';

const FaqCard: FC<{ faq: FaqType; open: boolean; onClick: () => void }> = ({
    faq,
    open,
    onClick,
}) => {
    const lang = locale.value === 'ru' ? 'Ru' : 'En';

    return (
        <li class="border-accent-foreground/10 bg-muted shadow-faq relative rounded-sm border px-5 py-7 sm:px-7 sm:pt-10 sm:pb-11 xl:px-9.5">
            <button
                onClick={onClick}
                type="button"
                class="absolute inset-0 z-5"
                aria-expanded={open}
                aria-controls={`faq-content-${faq.id}`}
                aria-label={faq.attributes[`title${lang}`]}
            >
                <span class="sr-only">
                    {open ? 'Collapse' : 'Expand'}{' '}
                    {faq.attributes[`title${lang}`]}
                </span>
            </button>

            <div class="flex items-start gap-5 sm:gap-7 xl:gap-9.5">
                <div class="">
                    <span
                        aria-hidden="true"
                        class="mt-1 block size-4.5 sm:size-6 xl:mt-0 xl:size-8"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={3}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-plus-icon lucide-plus size-full"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <path
                                d="M5 12h14"
                                className={cn(
                                    'origin-center transition-transform duration-500 ease-in-out',
                                    open ? 'rotate-0' : 'rotate-180',
                                )}
                            />
                            <path
                                d="M12 5v14"
                                className={cn(
                                    'origin-center transition-transform duration-500 ease-in-out',
                                    open ? 'rotate-90' : 'rotate-0',
                                )}
                            />
                        </svg>
                    </span>
                </div>
                <div>
                    <h3
                        id={`faq-title-${faq.id}`}
                        class="xs:text-lg font-bold xl:text-2xl"
                    >
                        {faq.attributes[`title${lang}`]}
                    </h3>

                    <div
                        id={`faq-content-${faq.id}`}
                        role="region"
                        aria-labelledby={`faq-title-${faq.id}`}
                        className={cn(
                            'overflow-hidden transition-[max-height] duration-500 ease-in-out',
                            open ? 'max-h-200' : 'max-h-0',
                        )}
                        aria-hidden={!open}
                    >
                        <p class="mt-6 text-sm text-pretty lg:mt-7 xl:text-xl">
                            {faq.attributes[`description${lang}`]}
                        </p>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default FaqCard;
