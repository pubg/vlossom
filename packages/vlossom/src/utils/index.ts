export function pascalToKebab(str: string) {
    return str
        .split(/(?=[A-Z])/)
        .map((s) => s.toLowerCase())
        .join('-');
}

export function getMetaArguments(componentProps: { [key: string]: any }) {
    const metaArgs: { [key: string]: any } = {};
    Object.keys(componentProps).forEach((prop) => {
        const { default: defaultValue } = componentProps[prop];
        if (typeof defaultValue === 'function') {
            metaArgs[prop] = defaultValue();
            return;
        }
        if (defaultValue === undefined) {
            metaArgs[prop] = null;
        } else {
            metaArgs[prop] = defaultValue;
        }
    });
    return metaArgs;
}
