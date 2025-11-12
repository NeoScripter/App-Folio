import SecondaryHeading from '@/components/user/ui/secondary-heading';
import AppSection from '@/layouts/user/app-section';
import Faqs from './faqs';

const FaqsSection = () => {
    return (
        <AppSection className="pb-28 sm:pb-23 lg:pb-31 xl:pb-35">
            <SecondaryHeading className='xl:mb-28'>
                Ответы на вопросы
            </SecondaryHeading>

            <Faqs />
        </AppSection>
    );
};

export default FaqsSection;
