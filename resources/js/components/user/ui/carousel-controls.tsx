import { cn } from '@/utils/cn';
import { range } from '@/utils/range';
import { ChevronLeft } from 'lucide-preact';
import { FC } from 'preact/compat';

const CarouselControls: FC<{
    current: number;
    slides: number;
    className?: string;
    handlePrev: () => void;
    handleNext: () => void;
}> = ({ className, handleNext, handlePrev, slides, current }) => {
    return (
        <nav class={cn('flex items-center justify-center gap-5 md:justify-between md:max-w-240 md:mx-auto', className)}>
            <CarouselBtn onClick={handlePrev} className="" />

            <div class="flex items-center justify-center gap-2">
                {range(1, slides).map((dot) => (
                    <SlideMarker key={dot} active={dot === current} />
                ))}
            </div>

            <CarouselBtn onClick={handleNext} className="rotate-180" />
        </nav>
    );
};

export default CarouselControls;

const CarouselBtn: FC<{ className?: string; onClick: () => void }> = ({
    className,
    onClick,
}) => {
    return (
        <button onClick={onClick} class={cn("sm:block",className)}>
            <ChevronLeft strokeWidth={3} class="text-gray-300 size-12 md:size-15" />
        </button>
    );
};

const SlideMarker: FC<{ className?: string, active: boolean }> = ({ className, active }) => {
    return (
        <div class={cn('bg-gray-300 h-2 md:h-3 flex-1 max-w-12 min-w-6 md:w-12 w-8 rounded-sm', active && 'bg-slide-marker')} />
    );
};
