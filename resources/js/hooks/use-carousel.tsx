import { RefObject } from "preact";
import { useCallback, useEffect, useReducer } from "preact/hooks";

// Types
type CarouselState<T> = {
    slides: T[];
    animationMultiplier: number;
    isAnimating: boolean;
    shouldAnimate: boolean;
    touchStartX: number | null;
};

type CarouselAction<T> =
    | { type: 'START_SLIDE'; direction: 1 | -1 }
    | { type: 'FINISH_SLIDE'; direction: 1 | -1 }
    | { type: 'TOUCH_START'; x: number }
    | { type: 'TOUCH_END' }
    | { type: 'SET_SLIDES'; slides: T[] };

type UseCarouselOptions<T> = {
    slides: T[];
    containerRef: RefObject<HTMLElement>;
    nextButtonRef?: RefObject<HTMLButtonElement>;
    prevButtonRef?: RefObject<HTMLButtonElement>;
};

// Reducer
function carouselReducer<T>(
    state: CarouselState<T>,
    action: CarouselAction<T>,
): CarouselState<T> {
    switch (action.type) {
        case 'START_SLIDE':
            return {
                ...state,
                isAnimating: true,
                shouldAnimate: true,
                animationMultiplier: action.direction,
            };
        case 'FINISH_SLIDE': {
            const newSlides =
                action.direction === 1
                    ? [...state.slides.slice(1), state.slides[0]]
                    : [
                          state.slides[state.slides.length - 1],
                          ...state.slides.slice(0, -1),
                      ];
            return {
                ...state,
                slides: newSlides,
                isAnimating: false,
                shouldAnimate: false,
                animationMultiplier: 0,
            };
        }
        case 'TOUCH_START':
            return { ...state, touchStartX: action.x };
        case 'TOUCH_END':
            return { ...state, touchStartX: null };
        case 'SET_SLIDES':
            return { ...state, slides: action.slides };
        default:
            return state;
    }
}

const ANIMATION_DURATION = 500;
const SWIPE_THRESHOLD = 50;
const INITIAL_OFFSET = 3;

// Hook
export function useCarousel<T>({
    slides,
    containerRef,
    nextButtonRef,
    prevButtonRef,
}: UseCarouselOptions<T>) {
    const [state, dispatch] = useReducer(carouselReducer<T>, {
        slides: [...slides],
        animationMultiplier: 0,
        isAnimating: false,
        shouldAnimate: false,
        touchStartX: null,
    });

    // Update slides when external data changes
    useEffect(() => {
        if (slides.length > 0) {
            dispatch({ type: 'SET_SLIDES', slides: [...slides] });
        }
    }, [slides.length]);

    // Calculate single slide offset dynamically from DOM
    const getSlideOffset = useCallback((): number => {
        const container = containerRef.current;
        if (!container || container.children.length === 0) return 0;

        const firstSlide = container.children[0] as HTMLElement;
        const slideWidth = firstSlide.offsetWidth;

        const computedStyle = window.getComputedStyle(container);
        const gap = parseFloat(computedStyle.gap) || 0;

        return slideWidth + gap;
    }, [containerRef]);

    // Apply transform styles to container
    const applyTransform = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        const slideOffset = getSlideOffset();
        const baseOffset = slideOffset * INITIAL_OFFSET;
        const animationOffset = slideOffset * state.animationMultiplier;
        const totalOffset = baseOffset + animationOffset;

        const transform = `translateX(-${totalOffset}px)`;
        const transition = state.shouldAnimate
            ? `transform ${ANIMATION_DURATION}ms ease-in-out`
            : 'none';

        container.style.transform = transform;
        container.style.transition = transition;
    }, [
        containerRef,
        state.animationMultiplier,
        state.shouldAnimate,
        getSlideOffset,
    ]);

    useEffect(() => {
        applyTransform();
    }, [applyTransform]);

    // Slide handler
    const handleSlide = useCallback(
        (direction: 1 | -1) => {
            if (state.isAnimating || state.slides.length === 0) return;

            dispatch({ type: 'START_SLIDE', direction });

            setTimeout(() => {
                dispatch({ type: 'FINISH_SLIDE', direction });
            }, ANIMATION_DURATION);
        },
        [state.isAnimating, state.slides.length],
    );

    const handleNext = useCallback(() => handleSlide(1), [handleSlide]);
    const handlePrev = useCallback(() => handleSlide(-1), [handleSlide]);

    // Touch handlers
    const handleTouchStart = useCallback((e: TouchEvent) => {
        dispatch({ type: 'TOUCH_START', x: e.touches[0].clientX });
    }, []);

    const handleTouchEnd = useCallback(
        (e: TouchEvent) => {
            if (state.touchStartX === null) return;

            const deltaX = e.changedTouches[0].clientX - state.touchStartX;

            if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
                deltaX > 0 ? handlePrev() : handleNext();
            }

            dispatch({ type: 'TOUCH_END' });
        },
        [state.touchStartX, handleNext, handlePrev],
    );

    // Recalculate on resize
    useEffect(() => {
        window.addEventListener('resize', applyTransform);
        return () => window.removeEventListener('resize', applyTransform);
    }, [applyTransform]);

    // Attach button click handlers
    useEffect(() => {
        const nextBtn = nextButtonRef?.current;
        const prevBtn = prevButtonRef?.current;

        if (nextBtn) nextBtn.addEventListener('click', handleNext);
        if (prevBtn) prevBtn.addEventListener('click', handlePrev);

        return () => {
            if (nextBtn) nextBtn.removeEventListener('click', handleNext);
            if (prevBtn) prevBtn.removeEventListener('click', handlePrev);
        };
    }, [nextButtonRef, prevButtonRef, handleNext, handlePrev]);

    // Attach touch handlers to container
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener('touchstart', handleTouchStart, {
            passive: true,
        });
        container.addEventListener('touchend', handleTouchEnd, {
            passive: true,
        });

        return () => {
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, [containerRef, handleTouchStart, handleTouchEnd]);

    return {
        slides: state.slides,
        goToNext: handleNext,
        goToPrev: handlePrev,
    };
}

/* ==================== USAGE EXAMPLE ==================== */

/*
import { useRef } from 'react';
import { useCarousel } from './useCarousel';

export default function Slider() {
    const { data: carwashes } = useCarwashes();

    const containerRef = useRef<HTMLDivElement>(null);
    const nextBtnRef = useRef<HTMLButtonElement>(null);
    const prevBtnRef = useRef<HTMLButtonElement>(null);

    const { slides } = useCarousel({
        slides: carwashes ? [...carwashes, ...carwashes] : [],
        containerRef,
        nextButtonRef: nextBtnRef,
        prevButtonRef: prevBtnRef,
    });

    return (
        <div className="overflow-hidden">
            <div
                ref={containerRef}
                className="flex gap-[10px] sm:gap-[17px] xl:gap-[15px]"
            >
                {slides.map((slide, index) => (
                    <div
                        key={`slide-${index}`}
                        className="min-w-[220px] sm:min-w-[367px] xl:min-w-[331px] shrink-0"
                    >
                        <CarwashCard {...slide} />
                    </div>
                ))}
            </div>

            <button ref={prevBtnRef}>Previous</button>
            <button ref={nextBtnRef}>Next</button>
        </div>
    );
}
*/
