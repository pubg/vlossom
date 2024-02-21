export const clipboardUtil = {
    copy(text: string) {
        navigator.clipboard.writeText(text);
    },
};
