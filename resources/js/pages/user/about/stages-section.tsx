import { Button } from '@/components/user/ui/button';
import SecondaryHeading from '@/components/user/ui/secondary-heading';
import AppSection from '@/layouts/user/app-section';
import { stages, StageType } from '@/lib/data/about/stages';
import { useModal } from '@/providers/modal-context';
import { appearance } from '@/signals/appearance';
import { locale } from '@/signals/locale';
import { cn } from '@/utils/cn';
import { FC, useState } from 'preact/compat';

const StagesSection: FC<{ className?: string }> = ({ className }) => {
    return (
        <AppSection
            className={cn(
                'bg-muted relative isolate py-12 sm:py-22.5 lg:py-27 xl:flex xl:items-center xl:gap-19 xl:px-0 xl:py-26 2xl:gap-21',
                className,
            )}
        >
            <span
                aria-hidden="true"
                class="bg-muted absolute -inset-x-5 inset-y-0 -z-5 block sm:-inset-x-15 md:-inset-x-19 lg:-inset-x-27 xl:-inset-x-47"
            />
            <StagesInfo />
            <Stages />
        </AppSection>
    );
};

export default StagesSection;

const StagesInfo = () => {
    const { showModal } = useModal();

    return (
        <div class="mb-18 sm:mb-20.5 md:mx-auto md:max-w-155 xl:mx-0 xl:mb-0 xl:max-w-123.5 2xl:max-w-187">
            <SecondaryHeading className="text-center xl:text-left xl:text-5xl 2xl:text-6xl">
                Рабочий процесс
            </SecondaryHeading>

            <p class="mb-8 text-center text-balance sm:mb-10 sm:text-lg lg:mb-12 xl:text-left xl:text-base 2xl:text-2xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                purus arcu, varius eget velit non, laoreet imperdiet orci.
                Mauris ultrices eget lorem ac vestibulum. Suspendis imperdiet,
            </p>
            <Button
                class="text-foreground hover:ring-muted-foreground/40 focus-visible:ring-muted-foreground/40 border-muted-none mx-auto flex hover:bg-zinc-700/20 xl:mx-0 xl:text-lg 2xl:text-2xl"
                onClick={() => (showModal.value = true)}
                variant="hero"
            >
                Нанять меня
            </Button>
        </div>
    );
};

const Stages = () => {
    const [active, setActive] = useState(0);

    const handleMouseEnter = (idx: number) => {
        setActive(idx);
    };
    const handleMouseLeave = () => {
        setActive(0);
    };

    return (
        <ul class="mx-auto grid w-fit justify-items-center gap-8 md:grid-cols-2 md:gap-x-10 md:gap-y-2 xl:mx-0 xl:gap-x-6 xl:gap-y-0 2xl:mx-auto 2xl:max-w-198">
            {stages.map((stage, idx) => (
                <Stage
                    onMouseEnter={() => handleMouseEnter(idx)}
                    onMouseLeave={() => handleMouseLeave()}
                    key={stage.id}
                    active={active === idx}
                    stage={stage}
                    order={idx + 1}
                    isEven={(idx + 1) % 2 === 0}
                />
            ))}
        </ul>
    );
};

const Stage: FC<{
    stage: StageType;
    active: boolean;
    order: number;
    isEven: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}> = ({ stage, active, order, isEven, onMouseEnter, onMouseLeave }) => {
    const lang = locale.value === 'ru' ? 'Ru' : 'En';

    return (
        <li
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            class={cn(
                'bg-user-background max-w-110 rounded-md ring-accent-foreground/15 ring-1 p-8 transition-[shadow,scale]',
                {
                    'shadow-video scale-102': active,
                    'md:mt-8': isEven,
                    'md:mb-8': !isEven,
                },
            )}
        >
            <div
                class={cn(
                    'mb-8 size-18 rounded-sm p-5',
                    {
                        'bg-foreground text-white': active && appearance.value === 'light',
                        'bg-gray-300 text-background': active && appearance.value === 'dark',
                        'bg-gray-300/50': !active && appearance.value === 'light',
                        'bg-footer-bg': !active && appearance.value === 'dark',
                    },
                )}
            >
                <stage.icon class="size-8" />
            </div>
            <h4 class="mb-3 text-xl font-bold 2xl:text-2xl">{`${order}. ${stage[`title${lang}`]}`}</h4>
            <p class="text-sm sm:text-base xl:text-sm 2xl:text-base">
                {stage[`description${lang}`]}
            </p>
        </li>
    );
};
