import FeaturedBgDk from '@/assets/images/home/featured-bg-dk.webp';
import FeaturedBgMb from '@/assets/images/home/featured-bg-mb.webp';
import SecondaryHeading from '@/components/user/ui/secondary-heading';
import AppSection from '@/layouts/user/app-section';
import { LG } from '@/lib/constants/breakpoints';
import { cn } from '@/utils/cn';
import { FC, useEffect, useState } from 'preact/compat';

const FeaturedSection: FC<{ className?: string }> = ({ className }) => {
    const mq = window.matchMedia(`(max-width: ${LG}px)`);
    const [isMobile, setIsMobile] = useState(mq.matches);

    useEffect(() => {
        const updateDrawerStatus = (e: MediaQueryListEvent) =>
            setIsMobile(e.matches);

        mq.addEventListener('change', updateDrawerStatus);

        return () => mq.removeEventListener('change', updateDrawerStatus);
    }, [mq]);

    return (
        <AppSection
            className={cn(
                'relative isolate bg-contain bg-no-repeat py-14 sm:pt-19 sm:pb-12 lg:pt-17 lg:pb-22 xl:pb-18',
                className,
            )}
        >
            <div
                aria-hidden="true"
                class="absolute inset-0 isolate -z-5 h-fit overflow-clip md:rounded-xl"
            >
                <img
                    src={isMobile ? FeaturedBgMb : FeaturedBgDk}
                    alt=""
                    class="w-full object-contain"
                />
                <div
                    class="absolute inset-0 z-5"
                    style={{
                        backgroundImage: `linear-gradient(180deg, rgba(242,246,250,0) 0%, #fff 90.87%)`,
                    }}
                />
            </div>
            <SecondaryHeading>
                Адаптивный дизайн, высокая производительность и удобство
                интерфейсов.
            </SecondaryHeading>
            <p class="max-w-208">
                Здесь представлены мои проекты, а также информация о моем опыте
                и профессиональной деятельности. Я подробно рассказываю, как
                создавался каждый проект, и описываю ключевые этапы работы. Если
                вы заинтересованы в сотрудничестве, буду рад обсудить создание
                вашего проекта. Спасибо, что заглянули, надеюсь, вам понравится
                мое портфолио!
            </p>
        </AppSection>
    );
};

export default FeaturedSection;
