import SecondaryHeading from '@/components/user/ui/secondary-heading';
import AppSection from '@/layouts/user/app-section';
import Faqs from './faqs';

const FaqsSection = () => {
    return (
        <AppSection>
            <SecondaryHeading className='xl:mb-28'>
                Ответы на вопросы
            </SecondaryHeading>

            <Faqs />
        </AppSection>
    );
};

export default FaqsSection;
