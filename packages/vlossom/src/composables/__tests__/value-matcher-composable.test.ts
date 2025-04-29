import { describe, expect, it } from 'vitest';
import { ref } from 'vue';
import { useValueMatcher } from '@/composables';

describe('value-matcher-composable', () => {
    describe('isMatched', () => {
        it('inputValue가 trueValue와 다르면 false를 반환한다', () => {
            // given
            const multiple = ref(false);
            const inputValue = ref('some value');
            const trueValue = ref('true value');
            const falseValue = ref('false value');

            // when
            const { isMatched } = useValueMatcher(multiple, inputValue, trueValue, falseValue);

            // then
            expect(isMatched.value).toBe(false);
        });

        it('inputValue가 trueValue와 같으면 true를 반환한다', () => {
            // given
            const multiple = ref(false);
            const inputValue = ref('true value');
            const trueValue = ref('true value');
            const falseValue = ref('false value');

            // when
            const { isMatched } = useValueMatcher(multiple, inputValue, trueValue, falseValue);

            // then
            expect(isMatched.value).toBe(true);
        });

        describe('multiple (true)', () => {
            it('inputValue가 array가 아닌 경우 false를 반환한다', () => {
                // given
                const multiple = ref(true);
                const inputValue = ref('not array value');
                const trueValue = ref('true value');
                const falseValue = ref('false value');

                // when
                const { isMatched } = useValueMatcher(multiple, inputValue, trueValue, falseValue);

                // then
                expect(isMatched.value).toBe(false);
            });

            it('inputValue가 array이고, trueValue와 일치하는 요소가 있으면 true를 반환한다', () => {
                // given
                const multiple = ref(true);
                const inputValue = ref(['some value', 'true value', 'another value']);
                const trueValue = ref('true value');
                const falseValue = ref('false value');

                // when
                const { isMatched } = useValueMatcher(multiple, inputValue, trueValue, falseValue);

                // then
                expect(isMatched.value).toBe(true);
            });

            it('inputValue가 array이고, trueValue와 일치하는 요소가 없으면 false를 반환한다', () => {
                // given
                const multiple = ref(true);
                const inputValue = ref(['some value', 'another value']);
                const trueValue = ref('true value');
                const falseValue = ref('false value');

                // when
                const { isMatched } = useValueMatcher(multiple, inputValue, trueValue, falseValue);

                // then
                expect(isMatched.value).toBe(false);
            });
        });
    });

    describe('getInitialValue', () => {
        it('inputValue가 trueValue와 다르면 falseValue를 반환한다', () => {
            // given
            const multiple = ref(false);
            const inputValue = ref('some value');
            const trueValue = ref('true value');
            const falseValue = ref('false value');

            // when
            const { getInitialValue } = useValueMatcher(multiple, inputValue, trueValue, falseValue);
            const result = getInitialValue();

            // then
            expect(result).toBe('false value');
        });

        it('inputValue가 trueValue와 같으면 trueValue를 반환한다', () => {
            // given
            const multiple = ref(false);
            const inputValue = ref('true value');
            const trueValue = ref('true value');
            const falseValue = ref('false value');

            // when
            const { getInitialValue } = useValueMatcher(multiple, inputValue, trueValue, falseValue);
            const result = getInitialValue();

            // then
            expect(result).toBe('true value');
        });

        describe('multipe (true)', () => {
            it('inputValue가 array가 아닌 경우 빈 배열을 반환한다', () => {
                // given
                const multiple = ref(true);
                const inputValue = ref('not array value');
                const trueValue = ref('true value');
                const falseValue = ref('false value');

                // when
                const { getInitialValue } = useValueMatcher(multiple, inputValue, trueValue, falseValue);
                const result = getInitialValue();

                // then
                expect(result).toEqual([]);
            });

            it('inputValue가 array이면 inputValue를 그대로 반환한다', () => {
                // given
                const multiple = ref(true);
                const inputValue = ref(['some value', 'true value', 'another value']);
                const trueValue = ref('true value');
                const falseValue = ref('false value');

                // when
                const { getInitialValue } = useValueMatcher(multiple, inputValue, trueValue, falseValue);
                const result = getInitialValue();

                // then
                expect(result).toEqual(inputValue.value);
            });
        });
    });

    describe('getUpdatedValue', () => {
        it('true 값으로 update된 값을 가져올 수 있다', () => {
            // given
            const truthy = true;
            const multiple = ref(false);
            const inputValue = ref('some value');
            const trueValue = ref('true value');
            const falseValue = ref('false value');

            // when
            const { getUpdatedValue } = useValueMatcher(multiple, inputValue, trueValue, falseValue);
            const result = getUpdatedValue(truthy);

            // then
            expect(result).toBe('true value');
        });

        it('false 값으로 update된 값을 가져올 수 있다', () => {
            // given
            const truthy = false;
            const multiple = ref(false);
            const inputValue = ref('some value');
            const trueValue = ref('true value');
            const falseValue = ref('false value');

            // when
            const { getUpdatedValue } = useValueMatcher(multiple, inputValue, trueValue, falseValue);
            const result = getUpdatedValue(truthy);

            // then
            expect(result).toBe('false value');
        });

        describe('multiple (true)', () => {
            it('inputValue가 array가 아닌 경우 truthy하다면 trueValue가 포함된 array를 가져올 수 있다', () => {
                // given
                const truthy = true;
                const multiple = ref(true);
                const inputValue = ref('some value');
                const trueValue = ref('true value');
                const falseValue = ref('false value');

                // when
                const { getUpdatedValue } = useValueMatcher(multiple, inputValue, trueValue, falseValue);
                const result = getUpdatedValue(truthy);

                // then
                expect(result).toEqual(['true value']);
            });

            it('inputValue가 array가 아닌 경우 truthy하지 않다면 빈 배열을 반환한다', () => {
                // given
                const truthy = false;
                const multiple = ref(true);
                const inputValue = ref('some value');
                const trueValue = ref('true value');
                const falseValue = ref('false value');

                // when
                const { getUpdatedValue } = useValueMatcher(multiple, inputValue, trueValue, falseValue);
                const result = getUpdatedValue(truthy);

                // then
                expect(result).toEqual([]);
            });

            it('truthy하다면 trueValue가 포함된 array를 가져올 수 있다', () => {
                // given
                const truthy = true;
                const multiple = ref(true);
                const inputValue = ref(['some value', 'true value', 'another value']);
                const trueValue = ref('true value');
                const falseValue = ref('false value');

                // when
                const { getUpdatedValue } = useValueMatcher(multiple, inputValue, trueValue, falseValue);
                const result = getUpdatedValue(truthy);

                // then
                expect(result).toEqual(['some value', 'true value', 'another value']);
            });

            it('truthy하더라도 이미 inputValue에 값이 존재한다면 더 추가되지 않는다', () => {
                // given
                const truthy = true;
                const multiple = ref(true);
                const inputValue = ref(['some value', 'true value', 'another value']);
                const trueValue = ref('true value');
                const falseValue = ref('false value');

                // when
                const { getUpdatedValue } = useValueMatcher(multiple, inputValue, trueValue, falseValue);
                const result = getUpdatedValue(truthy);

                // then
                expect(result).toEqual(['some value', 'true value', 'another value']);
            });

            it('truthy하지 않다면 trueValue를 제외한 배열을 반환한다', () => {
                // given
                const truthy = false;
                const multiple = ref(true);
                const inputValue = ref(['some value', 'true value', 'another value']);
                const trueValue = ref('true value');
                const falseValue = ref('false value');

                // when
                const { getUpdatedValue } = useValueMatcher(multiple, inputValue, trueValue, falseValue);
                const result = getUpdatedValue(truthy);

                // then
                expect(result).toEqual(['some value', 'another value']);
            });
        });
    });

    describe('getClearedValue', () => {
        it('multiple이 아닐 때는 falseValue를 반환한다', () => {
            // given
            const multiple = ref(false);
            const inputValue = ref('some value');
            const trueValue = ref('true value');
            const falseValue = ref('false value');

            // when
            const { getClearedValue } = useValueMatcher(multiple, inputValue, trueValue, falseValue);
            const result = getClearedValue();

            // then
            expect(result).toBe('false value');
        });

        it('multiple인 경우 빈 배열을 반환한다', () => {
            // given
            const multiple = ref(true);
            const inputValue = ref(['some value', 'true value', 'another value']);
            const trueValue = ref('true value');
            const falseValue = ref('false value');

            // when
            const { getClearedValue } = useValueMatcher(multiple, inputValue, trueValue, falseValue);
            const result = getClearedValue();

            // then
            expect(result).toEqual([]);
        });
    });

    describe('addTrueValue', () => {
        it('multiple이 아닐 때는 아무 동작도 하지 않는다', () => {
            // given
            const multiple = ref(false);
            const inputValue = ref('some value');
            const trueValue = ref('true value');
            const falseValue = ref('false value');

            // when
            const { addTrueValue } = useValueMatcher(multiple, inputValue, trueValue, falseValue);
            addTrueValue();

            // then
            expect(inputValue.value).toBe('some value');
        });

        describe('multiple (true)', () => {
            it('inputValue가 array이고 trueValue가 없는 경우 trueValue를 추가한다', () => {
                // given
                const multiple = ref(true);
                const inputValue = ref(['some value', 'another value']);
                const trueValue = ref('true value');
                const falseValue = ref('false value');

                // when
                const { addTrueValue } = useValueMatcher(multiple, inputValue, trueValue, falseValue);
                addTrueValue();

                // then
                expect(inputValue.value).toEqual(['some value', 'another value', 'true value']);
            });

            it('inputValue가 array이고 이미 trueValue가 있는 경우 아무 동작도 하지 않는다', () => {
                // given
                const multiple = ref(true);
                const inputValue = ref(['some value', 'true value', 'another value']);
                const trueValue = ref('true value');
                const falseValue = ref('false value');

                // when
                const { addTrueValue } = useValueMatcher(multiple, inputValue, trueValue, falseValue);
                addTrueValue();

                // then
                expect(inputValue.value).toEqual(['some value', 'true value', 'another value']);
            });
        });
    });
});
