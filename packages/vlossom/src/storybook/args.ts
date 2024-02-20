import { COLORS, CSS_POSITION, PLACEMENTS, SIZES } from '@/declaration';

export const loremIpsum = `
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    Aenean commodo ligula eget dolor. Aenean massa.
    Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
    Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.
    In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
    Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.`;

export const colorScheme = {
    control: 'select',
    options: COLORS,
};

export const align = {
    control: 'select',
    options: ['center', 'start', 'end'],
};

export const placement = {
    control: 'select',
    options: PLACEMENTS,
};

export const size = {
    control: 'select',
    options: SIZES,
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

export const cssPosition = {
    control: 'select',
    options: CSS_POSITION,
};

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
