import EmailForm from '@/components/user/form/email-form';
import MailSvg from '@/components/user/svgs/mail-svg';
import { Button } from '@/components/user/ui/button';
import { cn } from '@/utils/cn';
import { PhoneCall } from 'lucide-preact';
import { ComponentChildren } from 'preact';
import { FC } from 'preact/compat';

const AppFooter: FC<{ className?: string }> = ({ className }) => {
    return (
        <footer
            class={cn('lg:flex lg:items-center lg:justify-between lg:gap-12 xl:gap-24 2xl:gap-40', className)}
        >
            <FooterInfo />

            <div class="flex-1 hidden lg:block lg:pb-10 xl:pb-20 lg:mt-8 xl:pr-0 lg:pr-6">
                <EmailForm />
            </div>
        </footer>
    );
};

export default AppFooter;

const FooterInfo = () => {
    return (
        <div class="bg-footer-bg text-footer-text relative isolate overflow-clip rounded-t-md px-10 pt-10 pb-7 sm:px-14 sm:pb-10 lg:w-125 lg:pb-11 lg:pl-10 xl:w-150 xl:pt-15 xl:pr-8 xl:pl-18">
            <ArtLayer />

            <h3 class="mb-4 text-4xl font-bold text-white sm:text-5xl xl:mb-6">
                Контакты
            </h3>
            <p class="sm:mr-10 sm:text-lg xl:text-2xl">
                Всегда рад ответить на любые ваши вопросы
            </p>

            <Button
                variant="footer"
                class="mt-7 rounded-2xl sm:mt-6 lg:mt-19 lg:hidden"
            >
                Форма для связи
            </Button>

            <FooterLink
                className="mt-23 sm:mt-10 lg:mt-19"
                label="+63 950 464 35 91"
                href="tel:+639504643591"
            >
                <PhoneCall class="group-hover:animate-wiggle size-full" />
            </FooterLink>

            <FooterLink
                className="mt-3.5 sm:mt-4.5"
                label="ask@ilyaandreev.dev"
                href="mailto:ask@ilyaandreev.dev"
            >
                <MailSvg className="size-full" />
            </FooterLink>

            <p class="mt-15 sm:mt-13 lg:mt-50 xl:text-right xl:text-lg">
                © Илья Андреев, 2025. Все права защищены
            </p>
        </div>
    );
};

const FooterLink: FC<{
    className?: string;
    label: string;
    href: string;
    children: ComponentChildren;
}> = ({ className, label, href, children }) => {
    return (
        <a
            target="_blank"
            href={href}
            class={cn(
                'ease group flex items-center gap-5 transition-colors duration-300 hover:text-white sm:gap-6 sm:text-xl xl:text-2xl',
                className,
            )}
        >
            <div class="size-5 sm:size-6 xl:size-7">{children}</div>
            <span>{label}</span>
        </a>
    );
};

const Ellipse = () => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 138 138"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="69" cy="69" r="69" fill="#FFF9F9" fill-opacity="0.13" />
        </svg>
    );
};

const ArtLayer = () => {
    return (
        <div
            class="absolute -right-1/4 -bottom-1/8 size-67.5 sm:-right-1/10"
            aria-hidden="true"
        >
            <Ellipse />
            <div
                class="absolute -top-1/5 -left-1/5 size-38 translate-1/5"
                aria-hidden="true"
            >
                <Ellipse />
            </div>
        </div>
    );
};
