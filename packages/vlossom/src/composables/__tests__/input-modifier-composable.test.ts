import { describe, expect, it } from 'vitest';
import { ref } from 'vue';
import { useStringModifier } from './../input-modifier-composable';

describe('input-modifier-composable', () => {
    describe('string modifier', () => {
        describe('modifyStringValue()', () => {
            it('modifier를 지정하지 않으면 값이 그대로 반환된다', () => {
                // given
                const modifiers = ref({});
                const { modifyStringValue } = useStringModifier(modifiers);
                const value = 'test';

                // when
                const result = modifyStringValue(value);

                // then
                expect(result).toBe(value);
            });

            it('modifier에 capitalize를 적용할 수 있다', () => {
                // given
                const modifiers = ref({ capitalize: true });
                const { modifyStringValue } = useStringModifier(modifiers);
                const value = 'test';

                // when
                const result = modifyStringValue(value);

                // then
                expect(result).toBe('Test');
            });

            it('modifier에 lower를 적용할 수 있다', () => {
                // given
                const modifiers = ref({ lower: true });
                const { modifyStringValue } = useStringModifier(modifiers);
                const value = 'TEST';

                // when
                const result = modifyStringValue(value);

                // then
                expect(result).toBe('test');
            });

            it('modifier에 upper를 적용할 수 있다', () => {
                // given
                const modifiers = ref({ upper: true });
                const { modifyStringValue } = useStringModifier(modifiers);
                const value = 'test';

                // when
                const result = modifyStringValue(value);

                // then
                expect(result).toBe('TEST');
            });
        });
    });
});
