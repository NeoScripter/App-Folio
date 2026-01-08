import { Service } from '@/lib/data/home/services';
import { locale } from '@/signals/locale';
import { cn } from '@/utils/cn';
import { FC } from 'preact/compat';

const ServiceCard: FC<{ service: Service; active: boolean }> = ({
    service,
    active,
}) => {
    const lang = locale.value === 'ru' ? 'ru' : 'en';

    return (
        <li
            class={cn(
                'bg-muted/85 border-accent-foreground/10 ease w-80 gap-8 rounded-xl border px-5 pt-8 pb-15 transition-opacity duration-500 ease-in select-none sm:w-96 sm:px-8 sm:py-10.5',
                !active && 'opacity-30',
            )}
        >
            <div class="mb-4.5">
                <service.icon class="size-12" strokeWidth={1.5} />
            </div>
            <p class="mb-6.5 text-xl font-semibold sm:text-2xl">
                {service.title[lang]}
            </p>
            <p class="sm:text-xl">{service.description[lang]}</p>
        </li>
    );
};

export default ServiceCard;
