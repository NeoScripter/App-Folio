import { cn } from '@/utils/cn';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-preact';
import type { ComponentChildren, FunctionalComponent } from 'preact';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    current_page: number;
    from: number | null;
    last_page: number;
    links: PaginationLink[];
    path: string;
    per_page: number;
    to: number | null;
    total: number;
}

interface PaginationProps {
    meta: PaginationMeta;
    className?: string;
    onClick: (newPage: number) => void;
}

const getPageNumber = (url: string): number => {
    try {
        const params = new URLSearchParams(url.split('?')[1]);
        const page = params.get('page');
        return page ? parseInt(page, 10) : 1;
    } catch {
        return 1;
    }
};

const Pagination: FunctionalComponent<PaginationProps> = ({
    meta,
    className,
    onClick,
}) => {
    const { links } = meta;

    if (!links || links.length === 0) return null;

    return (
        <div
            className={cn(
                'bg-background z-10 flex flex-wrap items-center p-4',
                className,
            )}
        >
            <nav
                aria-label="Pagination"
                className="isolate flex items-center justify-center gap-2 2xl:gap-3"
            >
                {links.map((link, index) => {
                    const isFirst = index === 0;
                    const isLast = index === links.length - 1;

                    return (
                        <PaginationButton
                            handleClick={onClick}
                            key={`pagination-${index}`}
                            link={link}
                        >
                            {isFirst ? (
                                <ChevronLeftIcon className="text-foreground size-8" />
                            ) : isLast ? (
                                <ChevronRightIcon className="text-foreground size-8" />
                            ) : (
                                link.label
                            )}
                        </PaginationButton>
                    );
                })}
            </nav>
        </div>
    );
};

interface PaginationButtonProps {
    link: PaginationLink;
    children: ComponentChildren;
    handleClick: (newPage: number) => void;
    class?: string;
}

const PaginationButton: FunctionalComponent<PaginationButtonProps> = ({
    link,
    children,
    handleClick,
    class: className,
}) => {
    const baseClasses = cn(
        'relative inline-flex size-10 items-center justify-center rounded-sm text-xl font-medium ring-1 transition duration-200 ease-in ring-inset',
        {
            'text-background ring-muted-foreground bg-foreground': link.active,
            'text-foreground ring-inherit hover:scale-110':
                !link.active && link.url,
            'opacity-50': !link.url,
        },
        className,
    );

    // Disabled state
    if (!link.url) {
        return <span className={baseClasses}>{children}</span>;
    }

    const page = getPageNumber(link.url);
    return (
        <button
            onClick={() => handleClick(page)}
            type="button"
            className={baseClasses}
        >
            {children}
        </button>
    );
};

export default Pagination;
