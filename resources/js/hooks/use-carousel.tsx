import { RefObject } from 'preact';
import { useCallback, useEffect, useReducer } from 'preact/hooks';

const ANIMATION_DURATION = 500;
const INITIAL_OFFSET = 3;
const SWIPE_THRESHOLD = 50;

type UseCarouselOptions<T> = {
    slides: T[];
    containerRef: RefObject<HTMLElement>;
};

type UseCarouselReturn<T> = {
    slides: T[];
    handleTouchStart: (e: TouchEvent) => void;
    handleTouchEnd: (e: TouchEvent) => void;
    handleIncrement: () => void;
    handleDecrement: () => void;
    shouldAnimate: boolean;
};

type CarouselState<T> = {
    slides: T[];
    multiplier: number;
    shouldAnimate: boolean;
    isAnimating: boolean;
    touchStartX: number | null;
};

type CarouselAction<T> =
    | { type: 'SET_SLIDES'; slides: T[] }
    | { type: 'START_SLIDE'; direction: 1 | -1 }
    | { type: 'FINISH_SLIDE'; direction: 1 | -1 }
    | { type: 'TOUCH_START'; x: number }
    | { type: 'TOUCH_END' };

function carouselReducer<T>(
    state: CarouselState<T>,
    action: CarouselAction<T>,
): CarouselState<T> {
    switch (action.type) {
        case 'SET_SLIDES':
            return {
                ...state,
                slides: action.slides,
            };
        case 'START_SLIDE':
            return {
                ...state,
                isAnimating: true,
                shouldAnimate: true,
                multiplier: action.direction,
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
                multiplier: 0,
            };
        }
        case 'TOUCH_START':
            return {
                ...state,
                touchStartX: action.x,
            };
        case 'TOUCH_END':
            return {
                ...state,
                touchStartX: null,
            };
        default:
            return state;
    }
}

export function useCarousel<T>({
    slides,
    containerRef,
}: UseCarouselOptions<T>): UseCarouselReturn<T> {
    const [state, dispatch] = useReducer(carouselReducer<T>, {
        slides: [...slides],
        multiplier: 0,
        shouldAnimate: false,
        isAnimating: false,
        touchStartX: null,
    });

    useEffect(() => {
        if (slides.length > 0) {
            dispatch({ type: 'SET_SLIDES', slides: [...slides] });
            requestAnimationFrame(() => {
                applyTransform(0, false);
            });
        }
    }, [slides.length]);

    const getSlideOffset = useCallback((): number => {
        const container = containerRef.current;
        if (!container || container.children.length === 0) return 0;

        const firstSlide = container.children[0] as HTMLElement;
        const slideWidth = firstSlide.offsetWidth;

        const computedStyle = window.getComputedStyle(container);
        const gap = parseFloat(computedStyle.gap) || 0;

        return slideWidth + gap;
    }, [containerRef]);

    const applyTransform = useCallback(
        (multiplier: number, shouldAnimate: boolean) => {
            const container = containerRef.current;
            if (!container) return;

            const slideOffset = getSlideOffset();
            const baseOffset = slideOffset * INITIAL_OFFSET;
            const animationOffset = slideOffset * multiplier;
            const totalOffset = baseOffset + animationOffset;

            const transform = `translateX(-${totalOffset}px)`;
            const transition = shouldAnimate
                ? `transform ${ANIMATION_DURATION}ms ease-in-out`
                : 'none';

            if (!shouldAnimate) {
                container.style.transition = 'none';
                requestAnimationFrame(() => {
                    container.style.transform = transform;
                });
            } else {
                container.style.transition = transition;
                container.style.transform = transform;
            }
        },
        [containerRef, getSlideOffset],
    );

    const handleSlide = useCallback(
        (direction: 1 | -1) => {
            if (state.isAnimating) return;

            dispatch({ type: 'START_SLIDE', direction });
            applyTransform(direction, true);

            setTimeout(() => {
                dispatch({ type: 'FINISH_SLIDE', direction });
                applyTransform(0, false);
            }, ANIMATION_DURATION);
        },
        [state.isAnimating, applyTransform],
    );

    const handleIncrement = useCallback(() => handleSlide(1), [handleSlide]);
    const handleDecrement = useCallback(() => handleSlide(-1), [handleSlide]);

    const handleTouchStart = useCallback((e: TouchEvent) => {
        dispatch({ type: 'TOUCH_START', x: e.touches[0].clientX });
    }, []);

    const handleTouchEnd = useCallback(
        (e: TouchEvent) => {
            if (state.touchStartX === null) return;

            const deltaX = e.changedTouches[0].clientX - state.touchStartX;

            if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
                deltaX > 0 ? handleDecrement() : handleIncrement();
            }

            dispatch({ type: 'TOUCH_END' });
        },
        [state.touchStartX, handleDecrement, handleIncrement],
    );

    useEffect(() => {
        const handleApply = () => applyTransform(0, false);
        window.addEventListener('resize', handleApply);
        return () => window.removeEventListener('resize', handleApply);
    }, []);

    return {
        slides: state.slides,
        handleTouchStart,
        handleTouchEnd,
        handleIncrement,
        handleDecrement,
        shouldAnimate: state.shouldAnimate,
    };
}
