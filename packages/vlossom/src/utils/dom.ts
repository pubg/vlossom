export const domUtil = {
    isBrowser(): boolean {
        return typeof window !== 'undefined';
    },
    getClientRect(element: HTMLElement): DOMRect {
        return element.getBoundingClientRect();
    },
};
