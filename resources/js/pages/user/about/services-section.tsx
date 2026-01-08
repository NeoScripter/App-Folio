import { Button } from '@/components/user/ui/button';
import SecondaryHeading from '@/components/user/ui/secondary-heading';
import AppSection from '@/layouts/user/app-section';
import { services, Service as ServiceType } from '@/lib/data/home/services';
import { useModal } from '@/providers/modal-context';
import { locale } from '@/signals/locale';
import { cn } from '@/utils/cn';
import { FC, useEffect, useRef, useState } from 'preact/compat';

const ServicesSection: FC<{ className?: string }> = ({ className }) => {
    return (
        <AppSection
            className={cn(
                'relative isolate py-12 sm:py-22.5 lg:py-27 xl:flex xl:items-center xl:gap-21 xl:px-0 xl:py-26 2xl:gap-16',
                className,
            )}
        >
            <ServicesInfo />
            <Services />
        </AppSection>
    );
};

export default ServicesSection;

const ServicesInfo = () => {
    const { showModal } = useModal();

    return (
        <div class="mb-18 sm:mb-20.5 lg:mx-auto lg:max-w-155 xl:mx-0 xl:mb-0 xl:max-w-123.5 2xl:max-w-187">
            <SecondaryHeading className="xl:text-5xl 2xl:text-6xl">
                Что я делаю?
            </SecondaryHeading>

            <p class="mb-8 text-balance sm:mb-10 sm:text-lg lg:mb-12 xl:text-left xl:text-base 2xl:text-2xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                purus arcu, varius eget velit non, laoreet imperdiet orci.
                Mauris ultrices eget lorem ac vestibulum. Suspendis imperdiet,
            </p>
            <Button
                class="text-foreground hover:ring-muted-foreground/40 focus-visible:ring-muted-foreground/40 border-muted-none hover:bg-zinc-700/20 xl:text-lg 2xl:text-2xl"
                onClick={() => (showModal.value = true)}
                variant="hero"
            >
                Нанять меня
            </Button>
        </div>
    );
};

const Services = () => {
    const [active, setActive] = useState(0);
    const [offset, setOffset] = useState(3);

    const handleMouseEnter = (idx: number) => {
        setActive(idx);
    };
    const handleMouseLeave = () => {
        setActive(0);
    };

    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setOffset((prev) => (prev < services.length - 1 ? prev + 1 : 3));
        }, 5000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <ul class="mx-auto grid w-fit justify-items-center gap-11 sm:gap-6 lg:max-w-142 xl:mr-0 xl:gap-9 2xl:max-w-189">
            {services.slice(offset - 3, offset).map((service, idx) => (
                <Service
                    onMouseEnter={() => handleMouseEnter(idx)}
                    onMouseLeave={() => handleMouseLeave()}
                    key={service.id}
                    active={active === idx}
                    service={service}
                    fadingIn={idx === 2}
                    fadingOut={idx === 0}
                    slidingUp1={idx === 1}
                    slidingUp2={idx === 2}
                />
            ))}
        </ul>
    );
};

const Service: FC<{
    service: ServiceType;
    active: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    fadingIn: boolean;
    fadingOut: boolean;
    slidingUp1: boolean;
    slidingUp2: boolean;
}> = ({
    service,
    active,
    onMouseEnter,
    onMouseLeave,
    fadingIn,
    fadingOut,
    slidingUp1,
    slidingUp2,
}) => {
    const lang = locale.value === 'ru' ? 'ru' : 'en';

    return (
        <li
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            class={cn(
                'bg-user-background ring-accent-foreground/15 rounded-md px-8 py-9.5 ring-1 transition-[shadow,scale,border] sm:p-8',
                {
                    'shadow-video border-foreground scale-102 border-l-4':
                        active,
                    'animate-fade-in': fadingIn,
                    'animate-fade-out': fadingOut,
                    'slide-up-1': slidingUp1,
                    'slide-up-2': slidingUp2,
                },
            )}
        >
            <h4 class="mb-3 text-2xl font-bold 2xl:text-2xl">
                {service.title[lang]}
            </h4>
            <p class="xl:text-base 2xl:text-lg max-w-[calc(100%-5px)]">
                {service.description[lang]}
            </p>
        </li>
    );
};
