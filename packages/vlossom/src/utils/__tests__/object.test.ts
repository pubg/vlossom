import { describe, it, expect } from 'vitest';
import { objectUtil } from '../object';

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
});
