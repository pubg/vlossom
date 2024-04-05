import * as _ from 'lodash-es';

export const objectUtil = {
    isEqual(value: any, other: any): boolean {
        return _.isEqual(value, other);
    },

    isUniq(array: any[]): boolean {
        return _.uniq(array).length === array.length;
    },

    isPlainObject(value: any): value is Record<string, any> {
        return _.isPlainObject(value);
    },
};
