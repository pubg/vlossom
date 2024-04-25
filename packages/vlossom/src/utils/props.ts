import { logUtil } from './log';

export const propsUtil = {
    checkPropExist<T = any>(componentName: string, property: string, options: any, value: T) {
        if (!options.includes(value)) {
            logUtil.logPropError(componentName, property, `${property} must be one of ${options.join(', ')}`);
            return false;
        }
        return true;
    },
};
