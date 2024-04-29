import * as _ from 'lodash-es';

export const objectUtil = {
    get: _.get,

    isEqual: _.isEqual,

    isUniq(array: any[]): boolean {
        return _.uniq(array).length === array.length;
    },

    isPlainObject(value: any): value is Record<string, any> {
        return _.isPlainObject(value);
    },

    omit: _.omit,

    pick: _.pick,
};
