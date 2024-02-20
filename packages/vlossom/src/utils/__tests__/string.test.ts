import { describe, it, expect } from 'vitest';
import { stringUtil } from '../string';

describe('string util', () => {
    describe('createID', () => {
        const { createID } = stringUtil;

        it('임의의 ID를 생성할 수 있다 (ID는 알파벳 소문자와 숫자로만 이루어져 있다)', () => {
            // when
            const result = createID();

            // then
            expect(result).toBeDefined();
            expect(result).toHaveLength(10);
            expect(result).toMatch(/^[a-z0-9]+$/);
        });

        it('ID의 길이를 제한해서 만들 수 있다', () => {
            // given
            const length = 5;

            // when
            const result = createID(length);

            // then
            expect(result).toHaveLength(length);
        });
    });

    describe('pascalToKebab', () => {
        const { pascalToKebab } = stringUtil;

        it('파스칼 케이스를 케밥 케이스로 변환할 수 있다', () => {
            // given
            const pascal = 'PascalCase';

            // when
            const result = pascalToKebab(pascal);

            // then
            expect(result).toBe('pascal-case');
        });
    });

    describe('parseUnit', () => {
        const { parseUnit } = stringUtil;

        it('패러미터로 받은 문자열을 값과 단위를 속성으로 갖는 객체로 변환할 수 있다', () => {
            // given
            const str1 = '200';
            const str2 = '200px';
            const str3 = '200%';
            const str4 = '1rem';
            const str5 = '2em';
            const InvalidStr = 'abc';

            // when
            const result1 = parseUnit(str1);
            const result2 = parseUnit(str2);
            const result3 = parseUnit(str3);
            const result4 = parseUnit(str4);
            const result5 = parseUnit(str5);
            const result6 = parseUnit(InvalidStr);

            // then
            expect(result1).toEqual({ value: 200, unit: 'px' });
            expect(result2).toEqual({ value: 200, unit: 'px' });
            expect(result3).toEqual({ value: 200, unit: '%' });
            expect(result4).toEqual({ value: 1, unit: 'rem' });
            expect(result5).toEqual({ value: 2, unit: 'em' });
            expect(result6).toEqual({ value: 0, unit: '' });
        });

        it('패러미터로 받은 숫자를 값과 단위를 속성으로 갖는 객체로 변환할 수 있다', () => {
            // given
            const str = 200;

            // when
            const result = parseUnit(str);

            // then
            expect(result).toEqual({ value: 200, unit: 'px' });
        });
    });
});
