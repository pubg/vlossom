import { logUtil } from './log';

export const propsUtil = {
    checkPropExist<T = any>(componentName: string, property: string, options: any, value: T) {
        if (!options.includes(value)) {
            logUtil.propError(componentName, property, `${property} must be one of ${options.join(', ')}`);
            return false;
        }
        return true;
    },
    checkValidNumber(componentName: string, property: string, value: number | string) {
        const num = Number(value);
        const isValid = !isNaN(num) && num >= Number.MIN_SAFE_INTEGER && num <= Number.MAX_SAFE_INTEGER;
        if (!isValid) {
            logUtil.propError(componentName, property, `invalid ${property} value`);
        }
        return isValid;
    },
};
