import * as _ from 'lodash-es';

export const objectUtil = {
    isEqual(value: any, other: any): boolean {
        return _.isEqual(value, other);
    },

    isUniq(array: any[]): boolean {
        return _.uniq(array).length === array.length;
    },

    pick(object: { [key: string]: any }, keys: string[]): { [key: string]: any } {
        return _.pick(object, keys);
    },
};
