export const logUtil = {
    error(target: string, message: string) {
        console.error(`[Vlossom] ${target}: ${message}`);
    },
    warning(target: string, message: string) {
        console.warn(`[Vlossom] ${target}: ${message}`);
    },
    propError(componentName: string, property: string, message: string) {
        this.error(`${componentName} property ${property}`, message);
    },
    propWarning(componentName: string, property: string, message: string) {
        this.warning(`${componentName} property ${property}`, message);
    },
};
