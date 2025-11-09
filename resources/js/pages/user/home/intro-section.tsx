import SecondaryHeading from '@/components/user/ui/secondary-heading';
import AppSection from '@/layouts/user/app-section';
import Reviews from './reviews';

const IntroSection = () => {
    return (
        <AppSection className="py-28 sm:pt-38 sm:pb-23 lg:pt-35 lg:pb-41 xl:pb-35">
            <SecondaryHeading>
                Уникальные и профессиональные сайты, которые невозможно не
                заметить
            </SecondaryHeading>
            <p class="max-w-208">
                Я специализируюсь на создании качественных и надежных сайтов. За
                годы работы я помог многим клиентам реализовать их проекты — от
                простых портфолио до сложных интернет-магазинов.
            </p>

            <Reviews />
        </AppSection>
    );
};

export default IntroSection;
