import SecondaryHeading from '@/components/user/ui/secondary-heading';
import AppSection from '@/layouts/user/app-section';
import Services from './services';

const ServicesSection = () => {
    return (
        <AppSection className="py-28 sm:pt-38 sm:pb-23 lg:pt-35 lg:pb-41 xl:pb-35">
            <SecondaryHeading>
                Создаю сайты, которые действительно работают
            </SecondaryHeading>
            <p class="max-w-208">
                Я создаю продуманные цифровые решения — от сайтов и
                веб-приложений до автоматизации бизнес-процессов. Помогаю
                превратить идею в работающий продукт: спроектировать
                архитектуру, написать чистый и поддерживаемый код, настроить
                интеграции и обеспечить стабильную работу системы.
            </p>

            <Services />
        </AppSection>
    );
};

export default ServicesSection;
