import * as _ from 'lodash-es';

// https://lodash.com/docs/#debounce
export interface DebounceOptions {
    leading?: boolean;
    maxWait?: number;
    trailing?: boolean;
}

// https://lodash.com/docs/#throttle
export interface ThrottleOptions {
    leading?: boolean;
    trailing?: boolean;
}

export const functionUtil = {
    debounce(func: (...args: any) => any, wait: number = 0, options?: DebounceOptions): (...args: any) => any {
        return _.debounce(func, wait, options);
    },

    throttle(func: (...args: any) => any, wait: number = 0, options?: ThrottleOptions): (...args: any) => any {
        return _.throttle(func, wait, options);
    },
};
