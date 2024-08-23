import { describe, it, expect } from 'vitest';
import { objectUtil } from './../object';

describe('object util', () => {
    describe('isEqual', () => {
        const { isEqual } = objectUtil;

        it('두 객체의 deep equal을 계산할 수 있다', () => {
            // given
            const value = { a: 1 };
            const other = { a: 1 };

            // when
            const result = isEqual(value, other);

            // then
            expect(result).toBe(true);
        });

        it('두 배열의 deep equal을 계산할 수 있다', () => {
            // given
            const value = [1, 2, 3];
            const other = [1, 2, 3];

            // when
            const result = isEqual(value, other);

            // then
            expect(result).toBe(true);
        });
    });

    describe('isUniq', () => {
        const { isUniq } = objectUtil;

        it('배열에 중복된 값이 있는지 확인할 수 있다', () => {
            // given
            const uniqueArray = [1, 2, 3];
            const duplicatedArray = [1, 2, 2, 3];

            // when
            const result1 = isUniq(uniqueArray);
            const result2 = isUniq(duplicatedArray);

            // then
            expect(result1).toBe(true);
            expect(result2).toBe(false);
        });
    });

    describe('isPlainObject', () => {
        const { isPlainObject } = objectUtil;

        it('객체가 plain object인지 확인할 수 있다', () => {
            // given
            const plainObject = { a: 1 };
            const notPlainObject = new Map();
            const array = [1, 2, 3];
            class Foo {
                a = 1;
            }
            const instance = new Foo();
            const func = () => {};

            // when
            const result1 = isPlainObject(plainObject);
            const result2 = isPlainObject(notPlainObject);
            const result3 = isPlainObject(array);
            const result4 = isPlainObject(instance);
            const result5 = isPlainObject(func);

            // then
            expect(result1).toBe(true);
            expect(result2).toBe(false);
            expect(result3).toBe(false);
            expect(result4).toBe(false);
            expect(result5).toBe(false);
        });
    });

    describe('pickWithPath', () => {
        it('path를 기준으로 pick 할 수 있다', () => {
            // given
            const object = { a: 1, b: 'hello', c: { d: true, e: { f: ['A', 'B'] } } };

            // when
            const result = objectUtil.pickWithPath(object, ['a', 'c.d', 'c.e.f']);

            // then
            expect(result).toEqual({ a: 1, 'c.d': true, 'c.e.f': ['A', 'B'] });
        });
    });

    describe('onlyValues', () => {
        it('object에서 값만 가져올 수 있다', () => {
            // given
            const object = { a: 1, b: 'hello', c: { d: true, e: { f: ['A', 'B'] } } };

            // when
            const result = objectUtil.onlyValues(object);

            // then
            expect(result).toEqual([1, 'hello', true, 'A', 'B']);
        });
    });
});
