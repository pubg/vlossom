import { describe, expect, it } from 'vitest';
import { ref } from 'vue';
import { useValueMatcher } from '@/composables';

describe('value-matcher-composable', () => {
    describe('isMatched', () => {
        it('inputValue 와 trueValue 가 같은 경우, true를 반환한다', () => {
            // given
            const multiple = ref(false);
            const modelValue = ref([1, 2, 3]);
            const inputValue = ref([1, 2, 3]);
            const trueValue = ref([1, 2, 3]);
            const falseValue = ref('falseValue');

            // when
            const { isMatched } = useValueMatcher(multiple, modelValue, inputValue, trueValue, falseValue);

            // then
            expect(isMatched.value).toBe(true);
        });

        describe('inputValue 와 trueValue 가 다른 경우,', () => {
            describe('modelvalue가 array 타입이면', () => {
                it('multiple 이 true이면, inputValue 중 하나라도 trueValue와 일치하는지 여부를 반환한다 ', () => {
                    // given
                    const multiple = ref(true);
                    const modelValue = ref([1, 2, 3]);
                    const inputValue = ref([1, 2, 3]);
                    const trueValue = ref(4);
                    const falseValue = ref('falseValue');

                    // when
                    const { isMatched } = useValueMatcher(multiple, modelValue, inputValue, trueValue, falseValue);

                    // then
                    expect(isMatched.value).toBe(false);
                });

                it('multiple 이 false이면 false를 반환한다', () => {
                    // given
                    const multiple = ref(false);
                    const modelValue = ref([1, 2, 3]);
                    const inputValue = ref([1, 2, 3]);
                    const trueValue = ref(1);
                    const falseValue = ref('falseValue');

                    // when
                    const { isMatched } = useValueMatcher(multiple, modelValue, inputValue, trueValue, falseValue);

                    // then
                    expect(isMatched.value).toBe(false);
                });
            });

            it('modelvalue 가 array 타입이 아니면 false를 반환한다', () => {
                // given
                const multiple = ref(true);
                const modelValue = ref(2);
                const inputValue = ref(2);
                const trueValue = ref(1);
                const falseValue = ref('falseValue');

                // when
                const { isMatched } = useValueMatcher(multiple, modelValue, inputValue, trueValue, falseValue);

                // then
                expect(isMatched.value).toBe(false);
            });
        });
    });

    describe('initialValue', () => {
        it('modelValue가 array 타입이고 multiple 이 true 이면 inputValue를 반환한다', () => {
            // given
            const multiple = ref(true);
            const modelValue = ref([1, 2, 3]);
            const inputValue = ref([1, 2, 3]);
            const trueValue = ref(1);
            const falseValue = ref('falseValue');

            // when
            const { getInitialValue } = useValueMatcher(multiple, modelValue, inputValue, trueValue, falseValue);

            // then
            expect(getInitialValue()).toEqual([1, 2, 3]);
        });

        describe('modelValue가 array 타입이 아니면', () => {
            it('modelValue가 trueValue와 같으면 trueValue를 반환한다', () => {
                // given
                const multiple = ref(false);
                const modelValue = ref(1);
                const inputValue = ref(1);
                const trueValue = ref(1);
                const falseValue = ref('falseValue');

                // when
                const { getInitialValue } = useValueMatcher(multiple, modelValue, inputValue, trueValue, falseValue);

                // then
                expect(getInitialValue()).toBe(1);
            });

            it('modelValue가 trueValue와 다르면 falseValue를 반환한다', () => {
                // given
                const multiple = ref(false);
                const modelValue = ref(0);
                const inputValue = ref(0);
                const trueValue = ref(1);
                const falseValue = ref('falseValue');

                // when
                const { getInitialValue } = useValueMatcher(multiple, modelValue, inputValue, trueValue, falseValue);

                // then
                expect(getInitialValue()).toBe('falseValue');
            });
        });
    });

    describe('clearedValue', () => {
        describe('modelValue가 array 타입인 경우', () => {
            it('multiple이 true이면 trueValue와 같은 값들을 제거한 배열을 반환한다', () => {
                // given
                const multiple = ref(true);
                const modelValue = ref([1, 2, 3]);
                const inputValue = ref([1, 2, 3]);
                const trueValue = ref(1);
                const falseValue = ref('falseValue');

                // when
                const { getClearedValue } = useValueMatcher(multiple, modelValue, inputValue, trueValue, falseValue);

                // then
                expect(getClearedValue()).toEqual([2, 3]);
            });

            it('multiple이 false이면 falseValue를 반환한다', () => {
                // given
                const multiple = ref(false);
                const modelValue = ref([1, 2, 3]);
                const inputValue = ref([1, 2, 3]);
                const trueValue = ref(1);
                const falseValue = ref('falseValue');

                // when
                const { getClearedValue } = useValueMatcher(multiple, modelValue, inputValue, trueValue, falseValue);

                // then
                expect(getClearedValue()).toBe('falseValue');
            });
        });

        it('modelValue가 array 타입이 아닌 경우, falseValue를 반환한다', () => {
            // given
            const multiple = ref(true);
            const modelValue = ref(1);
            const inputValue = ref(1);
            const trueValue = ref(1);
            const falseValue = ref('falseValue');

            // when
            const { getClearedValue } = useValueMatcher(multiple, modelValue, inputValue, trueValue, falseValue);

            // then
            expect(getClearedValue()).toBe('falseValue');
        });
    });

    describe('getUpdatedValue', () => {
        describe('modelValue가 array 타입이고 multiple이 true일 때', () => {
            it('toggled가 true이면 trueValue를 추가한 배열을 반환하고, false이면 trueValue를 제거한 배열을 반환한다', () => {
                // given
                const value = [1, 2, 3];

                const multiple = ref(true);
                const modelValue = ref(value);
                const inputValue = ref(value);
                const trueValue = ref(1);
                const falseValue = ref('falseValue');

                // when
                const { getUpdatedValue } = useValueMatcher(multiple, modelValue, inputValue, trueValue, falseValue);

                // then
                expect(getUpdatedValue(true, value)).toEqual([1, 2, 3, 1]);
                expect(getUpdatedValue(false, value)).toEqual([2, 3]);
            });
        });

        describe('modelValue가 array 타입이 아닐 때', () => {
            it('toggled가 true이면 trueValue를 반환하고, false이면 falseValue를 반환한다', () => {
                // given
                const value = 0;

                const multiple = ref(true);
                const modelValue = ref(value);
                const inputValue = ref(value);
                const trueValue = ref(1);
                const falseValue = ref('falseValue');

                // when
                const { getUpdatedValue } = useValueMatcher(multiple, modelValue, inputValue, trueValue, falseValue);

                // then
                expect(getUpdatedValue(true, value)).toBe(1);
                expect(getUpdatedValue(false, value)).toBe('falseValue');
            });
        });

        describe('multiple이 false일 때', () => {
            it('toggled가 true이면 trueValue를 반환하고, false이면 falseValue를 반환한다', () => {
                // given
                const value = 0;

                const multiple = ref(false);
                const modelValue = ref(value);
                const inputValue = ref(value);
                const trueValue = ref(1);
                const falseValue = ref('falseValue');

                // when
                const { getUpdatedValue } = useValueMatcher(multiple, modelValue, inputValue, trueValue, falseValue);

                // then
                expect(getUpdatedValue(true, value)).toBe(1);
                expect(getUpdatedValue(false, value)).toBe('falseValue');
            });
        });
    });
});
