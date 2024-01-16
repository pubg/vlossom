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
});
