import * as _ from 'radash';

export const objectUtil = {
    get: _.get,

    isEqual: _.isEqual,

    isUniq(array: any[]): boolean {
        return _.unique(array).length === array.length;
    },

    isPlainObject(value: any): value is Record<string, any> {
        return _.isObject(value);
    },

    omit: _.omit,

    pick: _.pick,
};
