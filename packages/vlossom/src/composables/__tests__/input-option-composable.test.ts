import { describe, expect, it } from 'vitest';
import { nextTick, ref } from 'vue';
import { useInputOption } from '@/composables';

describe('input option composable', () => {
    describe('getOptionLabel', () => {
        it('option이 string이면 option 그대로 반환한다', () => {
            // given
            const options = ref(['test']);

            // when
            const { getOptionLabel } = useInputOption(ref('dummy'), options, ref(''), ref(''));

            // then
            expect(getOptionLabel(options.value[0])).toBe('test');
        });

        it('option이 object이면 optionLabel에 해당하는 값을 반환한다', () => {
            // given
            const options = ref([{ label: 'test' }]);

            // when
            const { getOptionLabel } = useInputOption(ref('dummy'), options, ref('label'), ref(''));

            // then
            expect(getOptionLabel(options.value[0])).toBe('test');
        });

        it('option이 object이고 optionLabel이 없으면 JSON.stringify(option)을 반환한다', () => {
            // given
            const options = ref([{ label: 'test' }]);

            // when
            const { getOptionLabel } = useInputOption(ref('dummy'), options, ref(''), ref(''));

            // then
            expect(getOptionLabel(options.value[0])).toBe('{"label":"test"}');
        });

        it('option이 object이고 optionLabel이 object path 형식일 때 해당하는 값을 반환한다', () => {
            // given
            const options = ref([{ label: { test: 'test' } }]);

            // when
            const { getOptionLabel } = useInputOption(ref('dummy'), options, ref('label.test'), ref(''));

            // then
            expect(getOptionLabel(options.value[0])).toBe('test');
        });
    });

    describe('getOptionValue', () => {
        it('option이 string이면 option 그대로 반환한다', () => {
            // given
            const options = ref(['test']);

            // when
            const { getOptionValue } = useInputOption(ref('dummy'), options, ref(''), ref(''));

            // then
            expect(getOptionValue(options.value[0])).toBe('test');
        });

        it('option이 object이면 optionValue에 해당하는 값을 반환한다', () => {
            // given
            const options = ref([{ label: 'test', value: 'test-value' }]);

            // when
            const { getOptionValue } = useInputOption(ref('dummy'), options, ref(''), ref('value'));

            // then
            expect(getOptionValue(options.value[0])).toBe('test-value');
        });

        it('option이 object이고 optionValue가 없으면 option 그대로 반환한다', () => {
            // given
            const options = ref([{ label: 'test' }]);

            // when
            const { getOptionValue } = useInputOption(ref('dummy'), options, ref(''), ref(''));

            // then
            expect(getOptionValue(options.value[0])).toBe(options.value[0]);
        });

        it('option이 object이고 optionValue가 object path 형식일 때 해당하는 값을 반환한다', () => {
            // given
            const options = ref([{ label: 'test', value: { test: 'test-value' } }]);

            // when
            const { getOptionValue } = useInputOption(ref('dummy'), options, ref(''), ref('value.test'));

            // then
            expect(getOptionValue(options.value[0])).toBe('test-value');
        });
    });

    describe('options 변경 시', () => {
        describe('inputValue가 array인 경우', () => {
            it('빈 array인 경우 그대로 빈 array 값이 유지된다', async () => {
                // given
                const inputValue = ref([]);
                const options = ref(['test1', 'test2', 'test3']);

                // when
                useInputOption(inputValue, options, ref(''), ref(''));
                options.value = ['new-test1', 'new-test2', 'new-test3'];
                await nextTick();

                // then
                expect(inputValue.value).toEqual([]);
            });

            it('바뀐 options 중에 inputValue 값이 있다면 유지하고 없으면 제거한다', async () => {
                // given
                const inputValue = ref(['test1', 'test2']);
                const options = ref(['test1', 'test2', 'test3']);

                // when
                useInputOption(inputValue, options, ref(''), ref(''));
                options.value = ['test1', 'new-test2', 'new-test3'];
                await nextTick();

                // then
                expect(inputValue.value).toEqual(['test1']);
            });
        });

        describe('inputValue가 array가 아닌 경우', () => {
            it('바뀐 options 중에 inputValue 값이 있다면 유지한다', async () => {
                // given
                const inputValue = ref('test1');
                const options = ref(['test1', 'test2', 'test3']);

                // when
                useInputOption(inputValue, options, ref(''), ref(''));
                options.value = ['test1', 'new-test2', 'new-test3'];
                await nextTick();

                // then
                expect(inputValue.value).toBe('test1');
            });

            it('바뀐 options 중에 inputValue 값이 없다면 null을 할당한다', async () => {
                // given
                const inputValue = ref('test1');
                const options = ref(['test1', 'test2', 'test3']);

                // when
                useInputOption(inputValue, options, ref(''), ref(''));
                options.value = ['new-test1', 'new-test2', 'new-test3'];
                await nextTick();

                // then
                expect(inputValue.value).toBe(null);
            });
        });
    });
});
