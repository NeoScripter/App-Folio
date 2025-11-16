import SecondaryHeading from '@/components/user/ui/secondary-heading';
import AppSection from '@/layouts/user/app-section';
import Perks from './perks';

const PerksSection = () => {
    return (
        <AppSection className="pb-10 sm:pb-8 lg:pb-4 2xl:pb-8">
            <SecondaryHeading className="text-center text-balance">
                Преимущества работы со мной
            </SecondaryHeading>
            <p class="mx-auto max-w-258 text-center">
                Я специализируюсь на создании качественных и надежных сайтов. За
                годы работы я помог многим клиентам реализовать их проекты — от
                простых портфолио до сложных интернет-магазинов.
            </p>

            <Perks />
        </AppSection>
    );
};

export default PerksSection;
