export default function throttle<T extends (...args: any[]) => any>(
    fn: T,
    delay: number = 400,
): (...args: Parameters<T>) => void {
    let lastCall = 0;
    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            fn.apply(this, args);
        }
    };
}
