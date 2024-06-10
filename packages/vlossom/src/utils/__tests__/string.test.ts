import { describe, it, expect } from 'vitest';
import { stringUtil } from './../string';

describe('string util', () => {
    describe('createID', () => {
        const { createID } = stringUtil;

        it('임의의 ID를 생성할 수 있다 (ID는 알파벳 대문자와 소문자로 이루어져 있다)', () => {
            // when
            const result = createID();

            // then
            expect(result).toBeDefined();
            expect(result).toHaveLength(10);
            expect(result).toMatch(/^[A-Za-z]+$/);
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

    describe('convertToString', () => {
        const { convertToString } = stringUtil;

        it('Given a string, when the function is called, then it should return the same string', () => {
            // Given
            const value = 'test';

            // When
            const result = convertToString(value);

            // Then
            expect(result).toBe(value);
        });

        it('Given an object, when the function is called, then it should return the stringified object', () => {
            // Given
            const value = { key: 'value' };

            // When
            const result = convertToString(value);

            // Then
            expect(result).toBe(JSON.stringify(value));
        });

        it(`Given a non-string and non-object value, when the function is called,
            then it should return the stringified value`, () => {
            // Given
            const value = 123;

            // When
            const result = convertToString(value);

            // Then
            expect(result).toBe(String(value));
        });
    });
});
