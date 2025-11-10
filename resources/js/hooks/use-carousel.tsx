import { RefObject } from 'preact';
import { useCallback, useEffect, useReducer } from 'preact/hooks';
import useThrottle from './use-throttle';

const ANIMATION_DURATION = 500;
const INITIAL_OFFSET = 3;
const SWIPE_THRESHOLD = 50;
const MAX_SCREEN_SIZE = 1920;

type UseCarouselOptions = {
    containerRef: RefObject<HTMLElement>;
};

type UseCarouselReturn<T> = {
    slides: T[];
    currentSlide: number;
    handleTouchStart: (e: TouchEvent) => void;
    handleTouchEnd: (e: TouchEvent) => void;
    handleIncrement: () => void;
    handleDecrement: () => void;
    setter: (data: T[]) => void;
};

type CarouselState<T> = {
    slides: T[];
    multiplier: number;
    currentSlide: number;
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

            const nextSlide =
                action.direction === 1
                    ? (state.currentSlide + 1) % state.slides.length
                    : state.currentSlide === 0
                      ? state.slides.length - 1
                      : state.currentSlide - 1;
            return {
                ...state,
                currentSlide: nextSlide,
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
    containerRef,
}: UseCarouselOptions): UseCarouselReturn<T> {
    const [state, dispatch] = useReducer(carouselReducer<T>, {
        slides: [],
        multiplier: 0,
        currentSlide: 0,
        shouldAnimate: false,
        isAnimating: false,
        touchStartX: null,
    });

    const setter = (data: T[]) => {
        if (data != null) {
            dispatch({ type: 'SET_SLIDES', slides: data });
            requestAnimationFrame(() => {
                applyTransform(0, false);
            });
        }
    };

    const throttledApplyTransform = useThrottle(
        () => applyTransform(0, false),
        150,
    );

    const getOffset = useCallback(() => {
        const container = containerRef.current;
        if (!container) return 0;

        const first = container.firstElementChild as HTMLElement | null;
        if (!first) return 0;

        const gap = parseFloat(getComputedStyle(container).gap) || 0;
        return first.offsetWidth + gap;
    }, [containerRef]);

    const getCenteringOffset = useCallback(() => {
        const container = containerRef.current;
        const firstSlide = container?.firstElementChild as HTMLElement | null;
        if (!firstSlide) return 0;

        const viewportWidth = Math.min(window.innerWidth, MAX_SCREEN_SIZE);
        return (viewportWidth - firstSlide.offsetWidth) / 2;
    }, [containerRef]);

    const applyTransform = useCallback(
        (multiplier: number, shouldAnimate: boolean) => {
            const container = containerRef.current;
            if (!container) return;

            const slideOffset = getOffset();
            const totalOffset =
                slideOffset * (INITIAL_OFFSET + multiplier) -
                getCenteringOffset();

            container.style.transition = shouldAnimate
                ? `transform ${ANIMATION_DURATION}ms ease-in-out`
                : 'none';
            container.style.transform = `translateX(-${totalOffset}px)`;
        },
        [containerRef, getOffset],
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
        window.addEventListener('resize', throttledApplyTransform);
        return () =>
            window.removeEventListener('resize', throttledApplyTransform);
    }, [applyTransform]);

    return {
        slides: state.slides,
        currentSlide: state.currentSlide,
        handleTouchStart,
        handleTouchEnd,
        handleIncrement,
        handleDecrement,
        setter,
    };
}
