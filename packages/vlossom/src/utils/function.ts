import * as _ from 'radash';

export const functionUtil = {
    debounce(func: (...args: any) => any, delay: number = 0): (...args: any) => any {
        return _.debounce({ delay }, func);
    },

    throttle(func: (...args: any) => any, interval: number = 0): (...args: any) => any {
        return _.throttle({ interval }, func);
    },
};
