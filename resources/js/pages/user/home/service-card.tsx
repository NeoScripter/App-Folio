import { Service } from '@/lib/data/services';
import { locale } from '@/signals/locale';
import { cn } from '@/utils/cn';
import { FC } from 'preact/compat';

const ServiceCard: FC<{ service: Service; active: boolean }> = ({
    service,
    active,
}) => {
    const lang = locale.value === 'ru' ? 'Ru' : 'En';

    return (
        <li
            class={cn(
                'bg-muted/85 border border-accent-foreground/10 ease w-80 gap-8 rounded-xl sm:py-10.5 px-5 sm:px-8 pt-8 pb-15 transition-opacity duration-150 select-none sm:w-96',
                !active && 'opacity-30',
            )}
        >
            <div class="mb-4.5">
                <service.icon class="size-12" strokeWidth={1.5} />
            </div>
            <p class="mb-6.5 font-semibold text-xl sm:text-2xl">{service[`title${lang}`]}</p>
            <p class="sm:text-xl">{service[`description${lang}`]}</p>
        </li>
    );
};

export default ServiceCard;
