import { customAlphabet } from 'nanoid';

export const stringUtil = {
    createID(size = 10): string {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
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
};
