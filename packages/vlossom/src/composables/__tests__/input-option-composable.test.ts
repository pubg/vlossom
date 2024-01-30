import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import { useInputOption } from '@/composables';

describe('input option composable', () => {
    let onClearSpy = vi.fn();

    beforeEach(() => {
        onClearSpy = vi.fn();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('getOptionLabel', () => {
        it('option이 string이면 option 그대로 반환한다', () => {
            // given
            const options = ref(['test']);

            // when
            const { getOptionLabel } = useInputOption(options, ref(''), ref(''), { onClear: onClearSpy });

            // then
            expect(getOptionLabel(options.value[0])).toBe('test');
        });

        it('option이 object이면 optionLabel에 해당하는 값을 반환한다', () => {
            // given
            const options = ref([{ label: 'test' }]);

            // when
            const { getOptionLabel } = useInputOption(options, ref('label'), ref(''), { onClear: onClearSpy });

            // then
            expect(getOptionLabel(options.value[0])).toBe('test');
        });

        it('option이 object이고 optionLabel이 없으면 JSON.stringify(option)을 반환한다', () => {
            // given
            const options = ref([{ label: 'test' }]);

            // when
            const { getOptionLabel } = useInputOption(options, ref(''), ref(''), { onClear: onClearSpy });

            // then
            expect(getOptionLabel(options.value[0])).toBe('{"label":"test"}');
        });

        it('option이 object이고 optionLabel이 object path 형식일 때 해당하는 값을 반환한다', () => {
            // given
            const options = ref([{ label: { test: 'test' } }]);

            // when
            const { getOptionLabel } = useInputOption(options, ref('label.test'), ref(''), { onClear: onClearSpy });

            // then
            expect(getOptionLabel(options.value[0])).toBe('test');
        });
    });

    describe('getOptionValue', () => {
        it('option이 string이면 option 그대로 반환한다', () => {
            // given
            const options = ref(['test']);

            // when
            const { getOptionValue } = useInputOption(options, ref(''), ref(''), { onClear: onClearSpy });

            // then
            expect(getOptionValue(options.value[0])).toBe('test');
        });

        it('option이 object이면 optionValue에 해당하는 값을 반환한다', () => {
            // given
            const options = ref([{ label: 'test', value: 'test-value' }]);

            // when
            const { getOptionValue } = useInputOption(options, ref(''), ref('value'), { onClear: onClearSpy });

            // then
            expect(getOptionValue(options.value[0])).toBe('test-value');
        });

        it('option이 object이고 optionValue가 없으면 option 그대로 반환한다', () => {
            // given
            const options = ref([{ label: 'test' }]);

            // when
            const { getOptionValue } = useInputOption(options, ref(''), ref(''), { onClear: onClearSpy });

            // then
            expect(getOptionValue(options.value[0])).toBe(options.value[0]);
        });

        it('option이 object이고 optionValue가 object path 형식일 때 해당하는 값을 반환한다', () => {
            // given
            const options = ref([{ label: 'test', value: { test: 'test-value' } }]);

            // when
            const { getOptionValue } = useInputOption(options, ref(''), ref('value.test'), { onClear: onClearSpy });

            // then
            expect(getOptionValue(options.value[0])).toBe('test-value');
        });
    });

    describe('onClear', () => {
        it('options가 변경되면 onClear callback이 실행된다', async () => {
            // given
            const options = ref(['test']);

            // when
            useInputOption(options, ref(''), ref(''), { onClear: onClearSpy });
            options.value = ['test2'];
            await nextTick();

            // then
            expect(onClearSpy).toHaveBeenCalledTimes(1);
        });
    });
});
