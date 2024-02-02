import * as _ from 'lodash-es';
import type { DebounceSettings, ThrottleSettings } from 'lodash-es';

export const functionUtil = {
    debounce(func: (...args: any) => any, wait: number = 0, options?: DebounceSettings): (...args: any) => any {
        return _.debounce(func, wait, options);
    },

    throttle(func: (...args: any) => any, wait: number = 0, options?: ThrottleSettings): (...args: any) => any {
        return _.throttle(func, wait, options);
    },
};
