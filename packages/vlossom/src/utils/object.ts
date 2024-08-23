import { get, isEqual, isArray, unique, isObject, omit, pick } from 'radash';

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
    onlyValues(object: Record<string, any>): any[] {
        const result: any[] = [];

        for (const key in object) {
            const value = object[key];

            if (isArray(value)) {
                value.forEach((v) => {
                    if (isObject(v)) {
                        result.push(...objectUtil.onlyValues(v));
                    } else {
                        result.push(v);
                    }
                });
                continue;
            } else if (isObject(value)) {
                result.push(...objectUtil.onlyValues(value));
                continue;
            } else {
                result.push(value);
            }
        }
        return result;
    },
};
