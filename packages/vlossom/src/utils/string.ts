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

    parseUnit(str: string): { value: number; unit: string } {
        const match = str.match(/(\d+)(\w+|%)/);

        if (match) {
            return {
                value: Number(match[1]),
                unit: match[2],
            };
        }
        return {
            value: 0,
            unit: '',
        };
    },
};
