import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, nextTick, ref, toRefs } from 'vue';
import { getInputProps, useInput } from '@/composables/input-composable';
import { UIState } from '@/declaration';

import type { StateMessage } from '@/declaration';

describe('getInputProps', () => {
    it('input component에 필요한 props들을 가져올 수 있다', () => {
        // when
        const props = getInputProps();

        // then
        expect(props).toMatchSnapshot();
    });

    it('input props 중 제외할 props를 정할 수 있다', () => {
        // when
        const props = getInputProps('label', 'messages');

        // then
        expect(props).toMatchSnapshot();
        expect(props).not.toHaveProperty('label');
        expect(props).not.toHaveProperty('messages');
    });
});

describe('useInput composable', () => {
    const inputValue = ref('');
    let onMountedSpy = vi.fn();
    let onChangeSpy = vi.fn();
    let onClearSpy = vi.fn(() => {
        inputValue.value = '';
    });

    const InputComponent = defineComponent({
        render: () => null,
        props: {
            modelValue: { type: String, default: '' },
            ...getInputProps<string, []>(),
        },
        setup(props, ctx) {
            const { modelValue, label, messages, rules } = toRefs(props);

            return {
                ...useInput(inputValue, modelValue, ctx, label, {
                    callbacks: {
                        onMounted: onMountedSpy,
                        onChange: onChangeSpy,
                        onClear: onClearSpy,
                    },
                    messages,
                    rules,
                }),
            };
        },
    });

    beforeEach(() => {
        inputValue.value = '';
        onMountedSpy = vi.fn();
        onChangeSpy = vi.fn();
        onClearSpy = vi.fn(() => {
            inputValue.value = '';
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('value binding (inputValue, modelValue)', () => {
        it('modelValue 초깃값이 있으면 inputValue가 업데이트 된다', async () => {
            // when
            const wrapper = mount(InputComponent, {
                props: {
                    modelValue: 'test',
                    'onUpdate:modelValue': (v: string) => wrapper.setProps({ modelValue: v }),
                },
            });

            // then
            expect(inputValue.value).toBe('test');
            expect(wrapper.vm.changed).toBe(false);
            expect(wrapper.vm.modelValue).toBe('test');
        });

        it('inputValue 값을 업데이트 해서 modelValue를 업데이트 할 수 있다', async () => {
            // given
            const wrapper = mount(InputComponent, {
                props: {
                    modelValue: '',
                    'onUpdate:modelValue': (v: string) => wrapper.setProps({ modelValue: v }),
                },
            });

            // when
            await nextTick();
            inputValue.value = 'test';
            await nextTick();

            // then
            expect(inputValue.value).toBe('test');
            expect(wrapper.vm.modelValue).toBe('test');
            expect(wrapper.vm.changed).toBe(true);
            expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test']);
        });

        it('modelValue를 바꿔서 inputValue 값을 바꿀 수 있다', async () => {
            // given
            const wrapper = mount(InputComponent, {
                props: {
                    modelValue: '',
                    'onUpdate:modelValue': (v: string) => wrapper.setProps({ modelValue: v }),
                },
            });

            // when
            await nextTick();
            await wrapper.setProps({ modelValue: 'test' });

            // then
            expect(inputValue.value).toBe('test');
            expect(wrapper.vm.modelValue).toBe('test');
            expect(wrapper.vm.changed).toBe(true);
            expect(wrapper.emitted().change).toHaveLength(1);
            expect(wrapper.emitted().change?.[0]).toEqual(['test']);
        });

        it('mount 시점에 onMounted callback을 실행한다', () => {
            // given
            // when
            const wrapper = mount(InputComponent, {
                props: {
                    modelValue: '',
                    'onUpdate:modelValue': (v: string) => wrapper.setProps({ modelValue: v }),
                },
            });

            // then
            expect(onMountedSpy).toHaveBeenCalledTimes(1);
        });

        it('inputValue가 변경되면 onChange callback을 실행한다', async () => {
            // given
            const wrapper = mount(InputComponent, {
                props: {
                    modelValue: '',
                    'onUpdate:modelValue': (v: string) => wrapper.setProps({ modelValue: v }),
                },
            });

            // when
            await nextTick();
            inputValue.value = 'test';
            await nextTick();

            // then
            expect(onChangeSpy).toHaveBeenCalledTimes(1);
            expect(onChangeSpy).toHaveBeenCalledWith('test', '');
        });
    });

    describe('messages', () => {
        it('messages를 StateMessage[] 형태로 전달할 수 있다', async () => {
            // given
            const wrapper = mount(InputComponent, {
                props: {
                    messages: [
                        { state: UIState.Info, text: 'info message' },
                        { state: UIState.Success, text: 'success message' },
                        { state: UIState.Warning, text: 'warning message' },
                    ],
                },
            });

            // then
            expect(wrapper.vm.computedMessages).toHaveLength(3);
            expect(wrapper.vm.computedMessages[0].state).toBe(UIState.Info);
            expect(wrapper.vm.computedMessages[0].text).toBe('info message');
        });

        it('messages를 함수로 전달할 수 있다', () => {
            // given
            const wrapper = mount(InputComponent, {
                props: {
                    messages: [
                        () => ({ state: UIState.Info, text: 'info message' }),
                        () => ({ state: UIState.Success, text: 'success message' }),
                        () => ({ state: UIState.Warning, text: 'warning message' }),
                    ],
                },
            });

            // then
            expect(wrapper.vm.computedMessages).toHaveLength(3);
            expect(wrapper.vm.computedMessages[0].state).toBe(UIState.Info);
            expect(wrapper.vm.computedMessages[0].text).toBe('info message');
        });

        it('messages를 PromiseLike를 반환하는 함수로도 전달할 수 있다', async () => {
            // given
            const wrapper = mount(InputComponent, {
                props: {
                    messages: [
                        () => Promise.resolve({ state: UIState.Info, text: 'info message' }),
                        () => Promise.resolve({ state: UIState.Success, text: 'success message' }),
                        () => Promise.resolve({ state: UIState.Warning, text: 'warning message' }),
                    ],
                },
            });

            // call nextTick twice to check PromiseLike rule
            await nextTick();
            await nextTick();

            // then
            expect(wrapper.vm.computedMessages).toHaveLength(3);
            expect(wrapper.vm.computedMessages[0].state).toBe(UIState.Info);
            expect(wrapper.vm.computedMessages[0].text).toBe('info message');
        });

        it('messages가 바뀌면 바뀐 message를 반영할 수 있다', async () => {
            // given
            const wrapper = mount(InputComponent, {
                props: {
                    messages: [
                        { state: UIState.Info, text: 'info message' },
                        { state: UIState.Success, text: 'success message' },
                        { state: UIState.Warning, text: 'warning message' },
                    ],
                },
            });

            await wrapper.setProps({
                messages: [{ state: UIState.Error, text: 'changed message' }],
            });

            // then
            expect(wrapper.vm.computedMessages).toHaveLength(1);
            expect(wrapper.vm.computedMessages[0].state).toBe(UIState.Error);
            expect(wrapper.vm.computedMessages[0].text).toBe('changed message');
        });
    });

    describe('rules', () => {
        it('rule이 설정되었어도 값의 변경이 없다면 message가 없다', () => {
            //given
            const wrapper = mount(InputComponent, {
                props: {
                    rules: [(v: string) => (v ? '' : 'required')],
                },
            });

            // then
            expect(wrapper.vm.valid).toBe(false);
            expect(wrapper.vm.changed).toBe(false);
            expect(wrapper.vm.showRuleMessages).toBe(false);
            expect(wrapper.vm.computedMessages).toHaveLength(0);
        });

        it('값이 유효하면 rule error message가 없다', async () => {
            //given
            const wrapper = mount(InputComponent, {
                props: {
                    rules: [(v: string) => (v ? '' : 'required')],
                },
            });

            // when
            await nextTick();
            inputValue.value = 'test';
            await nextTick();

            // then
            expect(wrapper.vm.valid).toBe(true);
            expect(wrapper.vm.changed).toBe(true);
            expect(wrapper.vm.showRuleMessages).toBe(true);
            expect(wrapper.vm.computedMessages).toHaveLength(0);
        });

        it('값이 유효하지 않으면 rule error message가 있다', async () => {
            //given
            const wrapper = mount(InputComponent, {
                props: {
                    rules: [(v: string) => (v ? '' : 'required')],
                },
            });

            // when
            await nextTick();
            inputValue.value = 'test';
            await nextTick();
            inputValue.value = '';
            await nextTick();

            // then
            expect(wrapper.vm.valid).toBe(false);
            expect(wrapper.vm.changed).toBe(true);
            expect(wrapper.vm.showRuleMessages).toBe(true);
            expect(wrapper.vm.computedMessages).toEqual([{ state: UIState.Error, text: 'required' }]);
        });

        it('PromiseLike의 rule도 체크할 수 있다', async () => {
            //given
            const wrapper = mount(InputComponent, {
                props: {
                    rules: [
                        (v: string) => Promise.resolve(v ? '' : 'required'),
                        (v: string) => Promise.resolve(v === 'test' ? 'must not be test' : ''),
                    ],
                },
            });

            // when
            await nextTick();
            inputValue.value = 'test';
            await nextTick();
            inputValue.value = '';
            // call nextTick twice to check PromiseLike rule
            await nextTick();
            await nextTick();

            // then
            expect(wrapper.vm.valid).toBe(false);
            expect(wrapper.vm.changed).toBe(true);
            expect(wrapper.vm.showRuleMessages).toBe(true);
            expect(wrapper.vm.computedMessages).toEqual([{ state: UIState.Error, text: 'required' }]);
        });

        it('기존 message가 있으면 rule 체크 결과를 danger 타입으로 추가한다', async () => {
            // given
            const infoMsg: StateMessage = { state: UIState.Info, text: 'info message' };
            const wrapper = mount(InputComponent, {
                props: {
                    messages: [infoMsg],
                    rules: [(v: string) => (v ? '' : 'required')],
                },
            });

            // when
            await nextTick();
            inputValue.value = 'test';
            await nextTick();
            inputValue.value = '';
            await nextTick();

            // then
            expect(wrapper.vm.valid).toBe(false);
            expect(wrapper.vm.changed).toBe(true);
            expect(wrapper.vm.showRuleMessages).toBe(true);
            expect(wrapper.vm.computedMessages).toHaveLength(2);
            expect(wrapper.vm.computedMessages[0]).toEqual(infoMsg);
            expect(wrapper.vm.computedMessages[1]).toEqual({ state: UIState.Error, text: 'required' });
        });
    });

    describe('validate', () => {
        it('validate 함수를 호출하면 변경이 없어도 message가 노출된다', async () => {
            //given
            const wrapper = mount(InputComponent, {
                props: {
                    rules: [(v: string) => (v ? '' : 'required')],
                },
            });

            // when
            const result = wrapper.vm.validate();
            await nextTick();

            // then
            expect(result).toBe(false);
            expect(wrapper.vm.valid).toBe(false);
            expect(wrapper.vm.changed).toBe(false);
            expect(wrapper.vm.showRuleMessages).toBe(true);
            expect(wrapper.vm.computedMessages).toEqual([{ state: UIState.Error, text: 'required' }]);
        });

        describe('shake', () => {
            it('validate를 호출 했을 때 값이 유효하면 shake 값(boolean)에 변화가 없다', async () => {
                // given
                const wrapper = mount(InputComponent, {
                    props: {
                        rules: [(v: string) => (v ? '' : 'required')],
                    },
                });
                const oldShake = wrapper.vm.shake;
                await nextTick();
                inputValue.value = 'test';
                await nextTick();

                // when
                const result = wrapper.vm.validate();
                await nextTick();

                // then
                expect(result).toBe(true);
                expect(wrapper.vm.shake).toBe(oldShake);
            });

            it('validate를 호출 했을 때 값이 유효하지 않으면 shake 값(boolean)이 바뀐다', async () => {
                // given
                const wrapper = mount(InputComponent, {
                    props: {
                        rules: [(v: string) => (v ? '' : 'required')],
                    },
                });
                const oldShake = wrapper.vm.shake;

                // when
                const result = wrapper.vm.validate();
                await nextTick();

                // then
                expect(result).toBe(false);
                expect(wrapper.vm.shake).toBe(!oldShake);
            });
        });
    });

    describe('clear', () => {
        it('clear 함수를 호출하면 onClear callback이 실행된다', async () => {
            // given
            const wrapper = mount(InputComponent, {
                props: {
                    modelValue: '',
                    'onUpdate:modelValue': (v: string) => wrapper.setProps({ modelValue: v }),
                },
            });

            // when
            await nextTick();
            inputValue.value = 'test';
            await nextTick();
            wrapper.vm.clear();
            await nextTick();

            // then
            expect(wrapper.vm.changed).toBe(false);
            expect(wrapper.vm.modelValue).toBe('');
            expect(inputValue.value).toBe('');
            expect(onClearSpy).toHaveBeenCalledTimes(1);
        });
    });
});
