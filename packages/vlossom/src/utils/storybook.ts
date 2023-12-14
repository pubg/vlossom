export const storybookUtil = {
    getMetaArguments(componentProps: { [key: string]: any }, originalArgs: { [key: string]: any } = {}) {
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
    },
};
