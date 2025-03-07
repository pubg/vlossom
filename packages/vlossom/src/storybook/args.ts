import { COLORS, PLACEMENTS, SIZES } from '@/declaration';

export const colorScheme = {
    control: 'select' as any,
    options: COLORS,
};

export const align = {
    control: 'select' as any,
    options: ['center', 'start', 'end'],
};

export const verticalAlign = {
    control: 'select' as any,
    options: ['middle', 'top', 'bottom'],
};

export const placement = {
    control: 'select' as any,
    options: PLACEMENTS,
};

export const size = {
    control: 'select' as any,
    options: SIZES,
};

export const state = {
    control: 'select' as any,
    options: ['idle', 'info', 'success', 'warning', 'error'],
};

export function numberArray(length: number, multiSelect: boolean = false) {
    return {
        control: (multiSelect ? 'multi-select' : 'select') as any,
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
