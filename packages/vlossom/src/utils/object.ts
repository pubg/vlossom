import { get, isEqual, isArray, unique, isObject, omit, pick, shake } from 'radash';

export const objectUtil = {
    get,
    isEqual,
    isArray,
    unique,
    isUniq(array: any[]): boolean {
        return unique(array).length === array.length;
    },
    isPlainObject(value: any): value is Record<string, any> {
        return isObject(value);
    },
    omit,
    pick,
    pickWithPath(object: Record<string, any>, keys: string[]): Pick<string, any> {
        return keys.reduce(
            (acc, key) => {
                acc[key] = this.get(object, key);
                return acc;
            },
            {} as Record<string, any>,
        );
    },
    shake,
};
