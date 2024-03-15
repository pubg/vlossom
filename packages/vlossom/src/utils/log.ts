export const logUtil = {
    logError(target: string, message: string) {
        console.error(`[Vlossom] ${target}: ${message}`);
    },
    logWarning(target: string, message: string) {
        console.warn(`[Vlossom] ${target}: ${message}`);
    },
    logPropError(componentName: string, prop: string, message: string) {
        console.error(`[Vlossom] ${componentName} prop ${prop}: ${message}`);
    },
    logPropWarning(componentName: string, prop: string, message: string) {
        console.warn(`[Vlossom] ${componentName} prop ${prop}: ${message}`);
    },
};
