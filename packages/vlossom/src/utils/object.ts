import * as _ from 'lodash-es';

export const objectUtil = {
    isEqual(value: any, other: any): boolean {
        return _.isEqual(value, other);
    },
};
