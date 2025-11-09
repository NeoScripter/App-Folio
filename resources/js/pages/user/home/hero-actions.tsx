import AnimatedUnderline from '@/components/user/ui/animated-underline';
import { Button } from '@/components/user/ui/button';
import { cn } from '@/utils/cn';

const HeroActions = () => {
    return (
        <nav
            class="xs:text-base flex flex-wrap items-center gap-x-3 gap-y-6 text-sm lg:gap-x-6 lg:text-lg xl:text-xl"
            aria-label="Основные действия"
        >
            <Button variant="hero">Нанять меня</Button>

            <a href="/" class="group relative ml-5">
                Узнать больше
                <AnimatedUnderline className={cn('z-10 bg-white')} />
            </a>
        </nav>
    );
};

export default HeroActions;
