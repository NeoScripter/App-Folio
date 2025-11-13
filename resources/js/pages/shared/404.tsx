import ErrorCode from '@/assets/svgs/error-code';
import Error from '@/components/user/svgs/error';
import PrimaryLink from '@/components/user/ui/primary-link';
import AppLayout from '@/layouts/user/app-layout';
import AppSection from '@/layouts/user/app-section';

const NotFound = () => {
    return (
        <AppLayout variant="ghost" hasFooter={false}>
            <AppSection className="relative isolate overflow-clip text-center text-balance [&>*]:mx-auto">
                <div class="mt-24 mb-4 w-[80vw] max-w-90 sm:mb-10">
                    <ErrorCode className="size-full" />
                </div>
                <div class="w-3/5 max-w-56">
                    <Error className="w-full" />
                </div>

                <h1 class="mt-11 mb-5 sm:mb-11 text-xl font-bold sm:text-4xl xl:text-5xl">
                    Упс! Страница не найдена(
                </h1>
                <p class="sm:text-xl xl:text-2xl max-w-200">
                    Что-то пошло не так. Возможно, эта страница была перемещена
                    или удалена
                </p>

                <PrimaryLink className="mt-9 w-fit mb-25 sm:mt-12 xl:mt-13" href="/">
                    На главную
                </PrimaryLink>
            </AppSection>
        </AppLayout>
    );
};

export default NotFound;
