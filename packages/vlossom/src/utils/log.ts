export const logUtil = {
    logError(target: string, message: string) {
        console.error(`[Vlossom] ${target}: ${message}`);
    },
    logWarning(target: string, message: string) {
        console.warn(`[Vlossom] ${target}: ${message}`);
    },
    logPropError(componentName: string, property: string, message: string) {
        this.logError(`${componentName} property ${property}`, message);
    },
    logPropWarning(componentName: string, property: string, message: string) {
        this.logWarning(`${componentName} property ${property}`, message);
    },
};
