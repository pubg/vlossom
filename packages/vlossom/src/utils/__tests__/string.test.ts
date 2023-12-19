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
});
