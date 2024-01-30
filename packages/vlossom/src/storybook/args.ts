import { COLORS } from '@/declaration';

export const colorScheme = {
    control: 'select',
    options: COLORS,
};

export const verticalAlign = {
    control: 'select',
    options: ['center', 'top', 'bottom'],
};

export const align = {
    control: 'select',
    options: ['center', 'top', 'bottom', 'right', 'left'],
};

export const position = {
    control: 'select',
    options: ['top', 'bottom', 'right', 'left'],
};

export function getColorSchemeTemplate(templateStr: string) {
    return COLORS.map((color) => templateStr.replace(/{{\s*color\s*}}/g, color)).join('\n');
}

export function numberArray(length: number, multiSelect: boolean = false) {
    return {
        control: multiSelect ? 'multi-select' : 'select',
        options: Array.from({ length }, (_, i) => i),
    };
}

export function getMetaArguments(componentProps: { [key: string]: any }, originalArgs: { [key: string]: any } = {}) {
    const metaArgs: { [key: string]: any } = {};
    Object.keys(componentProps).forEach((prop) => {
        const { default: defaultValue } = componentProps[prop];
        if (typeof defaultValue === 'function') {
            metaArgs[prop] = defaultValue();
            return;
        }
        metaArgs[prop] = defaultValue ?? null;
    });
    return { ...metaArgs, ...originalArgs };
}
