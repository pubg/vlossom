import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, nextTick, ref, toRefs } from 'vue';
import { getInputProps } from '@/models';
import { useInput } from '@/composables/input-composable';

import type { Message, StateMessage } from '@/declaration';

describe('useInput composable', () => {
    const inputValue = ref('');
    let onMountedSpy = vi.fn();
    let onChangeSpy = vi.fn();
    let onClearSpy = vi.fn(() => {
        inputValue.value = '';
    });

    const TestInputComponent = defineComponent({
        render: () => null,
        props: {
            ...getInputProps<string>(),
            modelValue: { type: String, default: '' },
        },
        setup(props, ctx) {
            const { modelValue, id, messages, rules, state, disabled, readonly } = toRefs(props);

            return {
                ...useInput(ctx, {
                    inputValue,
                    modelValue,
                    id,
                    disabled,
                    readonly,
                    callbacks: {
                        onMounted: onMountedSpy,
                        onChange: onChangeSpy,
                        onClear: onClearSpy,
                    },
                    messages,
                    rules,
                    state,
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
        it('inputValue 값을 업데이트 해서 modelValue를 업데이트 할 수 있다', async () => {
            // given
            const wrapper = mount(TestInputComponent, {
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
            const wrapper = mount(TestInputComponent, {
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
            const wrapper = mount(TestInputComponent, {
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
            const wrapper = mount(TestInputComponent, {
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
            const messages: StateMessage[] = [
                { state: 'info', text: 'info message' },
                { state: 'success', text: 'success message' },
                { state: 'warning', text: 'warning message' },
            ];
            const wrapper = mount(TestInputComponent, {
                props: {
                    messages,
                },
            });

            // then
            expect(wrapper.vm.computedMessages).toHaveLength(3);
            expect(wrapper.vm.computedMessages).toEqual(messages);
        });

        it('messages를 함수로 전달할 수 있다', () => {
            // given
            const messages = [
                { state: 'info', text: 'info message' },
                { state: 'success', text: 'success message' },
                { state: 'warning', text: 'warning message' },
            ];
            const wrapper = mount(TestInputComponent, {
                props: {
                    messages: [() => messages[0], () => messages[1], () => messages[2]] as Message[],
                },
            });

            // then
            expect(wrapper.vm.computedMessages).toHaveLength(3);
            expect(wrapper.vm.computedMessages).toEqual(messages);
        });

        it('messages를 PromiseLike를 반환하는 함수로도 전달할 수 있다', async () => {
            // given
            const messages = [
                { state: 'info', text: 'info message' },
                { state: 'success', text: 'success message' },
                { state: 'warning', text: 'warning message' },
            ];
            const wrapper = mount(TestInputComponent, {
                props: {
                    messages: [
                        () => Promise.resolve(messages[0]),
                        () => Promise.resolve(messages[1]),
                        () => Promise.resolve(messages[2]),
                    ] as Message[],
                },
            });

            // call nextTick twice to check PromiseLike rule
            await nextTick();
            await nextTick();

            // then
            expect(wrapper.vm.computedMessages).toHaveLength(3);
            expect(wrapper.vm.computedMessages).toEqual(messages);
        });

        it('messages가 바뀌면 바뀐 message를 반영할 수 있다', async () => {
            // given
            const wrapper = mount(TestInputComponent, {
                props: {
                    messages: [
                        { state: 'info', text: 'info message' },
                        { state: 'success', text: 'success message' },
                        { state: 'warning', text: 'warning message' },
                    ],
                },
            });

            await wrapper.setProps({
                messages: [{ state: 'error', text: 'changed message' }],
            });

            // then
            expect(wrapper.vm.computedMessages).toHaveLength(1);
            expect(wrapper.vm.computedMessages[0].state).toBe('error');
            expect(wrapper.vm.computedMessages[0].text).toBe('changed message');
        });
    });

    describe('rules', () => {
        it('rule이 설정되었어도 값의 변경이 없다면 message가 없다', () => {
            //given
            const wrapper = mount(TestInputComponent, {
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
            const wrapper = mount(TestInputComponent, {
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
            const wrapper = mount(TestInputComponent, {
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
            expect(wrapper.vm.computedMessages).toEqual([{ state: 'error', text: 'required' }]);
        });

        it('PromiseLike의 rule도 체크할 수 있다', async () => {
            //given
            const wrapper = mount(TestInputComponent, {
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
            expect(wrapper.vm.computedMessages).toEqual([{ state: 'error', text: 'required' }]);
        });

        it('기존 message가 있으면 rule 체크 결과를 danger 타입으로 추가한다', async () => {
            // given
            const infoMsg: StateMessage = { state: 'info', text: 'info message' };
            const wrapper = mount(TestInputComponent, {
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
            expect(wrapper.vm.computedMessages[1]).toEqual({ state: 'error', text: 'required' });
        });
    });

    describe('validate', () => {
        it('validate 함수를 호출하면 변경이 없어도 message가 노출된다', async () => {
            //given
            const wrapper = mount(TestInputComponent, {
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
            expect(wrapper.vm.computedMessages).toEqual([{ state: 'error', text: 'required' }]);
        });

        describe('shake', () => {
            it('validate를 호출 했을 때 값이 유효하면 shake 값(boolean)에 변화가 없다', async () => {
                // given
                const wrapper = mount(TestInputComponent, {
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
                const wrapper = mount(TestInputComponent, {
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

    describe('computedState', () => {
        it('기본 state는 idle이다', async () => {
            // given
            const wrapper = mount(TestInputComponent, {
                props: {
                    modelValue: '',
                    'onUpdate:modelValue': (v: string) => wrapper.setProps({ modelValue: v }),
                    rules: [(v: string) => (v ? '' : 'required')],
                },
            });

            // then
            expect(wrapper.vm.changed).toBe(false);
            expect(wrapper.vm.valid).toBe(false);
            expect(wrapper.vm.computedState).toBe('idle');
        });

        it('state가 주입되면 해당 state를 반환한다', async () => {
            // given
            const wrapper = mount(TestInputComponent, {
                props: {
                    modelValue: '',
                    'onUpdate:modelValue': (v: string) => wrapper.setProps({ modelValue: v }),
                    rules: [(v: string) => (v ? '' : 'required')],
                    state: 'success',
                },
            });

            // then
            expect(wrapper.vm.changed).toBe(false);
            expect(wrapper.vm.valid).toBe(false);
            expect(wrapper.vm.computedState).toBe('success');
        });

        it('값의 변경이 있어도 valid하다면 주입된 state를 반환한다', async () => {
            // given
            const wrapper = mount(TestInputComponent, {
                props: {
                    modelValue: '',
                    'onUpdate:modelValue': (v: string) => wrapper.setProps({ modelValue: v }),
                    rules: [(v: string) => (v ? '' : 'required')],
                    state: 'success',
                },
            });

            // when
            await nextTick();
            inputValue.value = 'test';
            await nextTick();

            // then
            expect(wrapper.vm.changed).toBe(true);
            expect(wrapper.vm.valid).toBe(true);
            expect(wrapper.vm.computedState).toBe('success');
        });

        it('valid하지 않은 값이 입력되면 주입된 state와 관계없이 error state를 반환한다', async () => {
            // given
            const wrapper = mount(TestInputComponent, {
                props: {
                    modelValue: '',
                    'onUpdate:modelValue': (v: string) => wrapper.setProps({ modelValue: v }),
                    rules: [(v: string) => (v ? '' : 'required')],
                    state: 'success',
                },
            });

            // when
            await nextTick();
            inputValue.value = 'test';
            await nextTick();
            inputValue.value = '';
            await nextTick();

            // then
            expect(wrapper.vm.changed).toBe(true);
            expect(wrapper.vm.valid).toBe(false);
            expect(wrapper.vm.computedState).toBe('error');
        });

        it('valid하지 않을 때 validate를 호출하면 변경이 없어도 error state를 반환한다', async () => {
            // given
            const wrapper = mount(TestInputComponent, {
                props: {
                    modelValue: '',
                    'onUpdate:modelValue': (v: string) => wrapper.setProps({ modelValue: v }),
                    rules: [(v: string) => (v ? '' : 'required')],
                    state: 'success',
                },
            });

            // when
            await nextTick();
            const result = wrapper.vm.validate();
            await nextTick();

            // then
            expect(result).toBe(false);
            expect(wrapper.vm.changed).toBe(false);
            expect(wrapper.vm.valid).toBe(false);
            expect(wrapper.vm.computedState).toBe('error');
        });
    });

    describe('clear', () => {
        it('clear 함수를 호출하면 onClear callback이 실행된다', async () => {
            // given
            const wrapper = mount(TestInputComponent, {
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
