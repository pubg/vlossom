export const deviceUtil = {
    isTouchDevice: () => {
        return (
            'ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            (navigator as any).msMaxTouchPoints > 0 ||
            window.matchMedia('(pointer: coarse)').matches
        );
    },
};
