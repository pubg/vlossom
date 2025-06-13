import { customAlphabet } from 'nanoid';

export const stringUtil = {
    createID(size = 10): string {
        // element ID should not start with a number
        // https://www.w3schools.com/html/html_id.asp
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const nanoid = customAlphabet(chars, size);
        return nanoid();
    },

    pascalToKebab(str: string) {
        return str
            .split(/(?=[A-Z])/)
            .map((s) => s.toLowerCase())
            .join('-');
    },

    convertToString(value: any): string {
        if (typeof value === 'string') {
            return value;
        }
        if (typeof value === 'object') {
            return JSON.stringify(value);
        }
        return String(value);
    },

    convertToStringSize(size: string | number): string {
        if (typeof size === 'string' && isNaN(Number(size))) {
            return size;
        } else {
            return `${size}px`;
        }
    },

    toFileSizeFormat(number: number): string {
        if (number < 1e3) {
            return `${number} bytes`;
        }
        if (number >= 1e3 && number < 1e6) {
            return `${(number / 1e3).toFixed(1)} KB`;
        }
        if (number >= 1e6 && number < 1e9) {
            return `${(number / 1e6).toFixed(1)} MB`;
        }
        return `${(number / 1e9).toFixed(1)} GB`;
    },
};
