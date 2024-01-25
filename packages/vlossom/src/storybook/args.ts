export const colorScheme = {
    control: 'select',
    options: ['red', 'amber', 'green', 'teal', 'blue', 'indigo', 'purple', 'pink'],
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
