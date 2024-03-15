export const logUtil = {
    logPropError(componentName: string, prop: string, message: string) {
        console.error(`[Vlossom] ${componentName} prop ${prop}: ${message}`);
    },
    logPropWarning(componentName: string, prop: string, message: string) {
        console.warn(`[Vlossom] ${componentName} prop ${prop}: ${message}`);
    },
};
