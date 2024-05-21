import { afterEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import VsCheckbox from './../VsCheckbox.vue';

function mountComponent() {
    return mount(VsCheckbox);
}

describe('vs-checkbox', () => {
    describe('v-model', () => {
        it('modelValue의 초깃값을 설정할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckbox, {
                props: {
                    modelValue: true,
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });

            // then
            expect(wrapper.find('input').element.checked).toBe(true);
            expect(wrapper.vm.isChecked).toBe(true);
        });

        it('modelValue를 업데이트 할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckbox, {
                props: {
                    modelValue: false,
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });

            // when
            await wrapper.find('input').trigger('click');

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toHaveLength(1);
            expect(updateModelValueEvent?.[0][0]).toEqual(true);
            expect(wrapper.find('input').element.checked).toBe(true);
        });

        it('modelValue를 바꿔서 checkbox 값을 업데이트 할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckbox, {
                props: {
                    modelValue: false,
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });

            // when
            await wrapper.setProps({ modelValue: true });

            // then
            expect(wrapper.find('input').element.checked).toBe(true);
            expect(wrapper.vm.isChecked).toBe(true);
        });

        it('modelValue가 null이면 false로 가공해준다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckbox, {
                props: {
                    modelValue: null,
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });

            // when
            await nextTick();

            // then
            expect(wrapper.find('input').element.checked).toBe(false);
            expect(wrapper.props('modelValue')).toBe(false);
        });
    });

    describe('true / false value', () => {
        it('true-value, false-value를 설정할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckbox, {
                props: {
                    modelValue: 'A',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    trueValue: 'A',
                    falseValue: 'B',
                },
            });

            // then
            expect(wrapper.find('input').element.checked).toBe(true);
            expect(wrapper.vm.isChecked).toBe(true);
        });

        it('checkbox를 true로 업데이트하면 modelValue를 true-value 값으로 업데이트 한다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckbox, {
                props: {
                    modelValue: 'B',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    trueValue: 'A',
                    falseValue: 'B',
                },
            });

            // when
            await wrapper.find('input').trigger('click');

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toHaveLength(1);
            expect(updateModelValueEvent?.[0][0]).toEqual('A');
        });

        it('checkbox를 false로 업데이트하면 modelValue를 false-value 값으로 업데이트 한다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckbox, {
                props: {
                    modelValue: 'A',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    trueValue: 'A',
                    falseValue: 'B',
                },
            });

            // when
            await wrapper.find('input').trigger('click');

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toHaveLength(1);
            expect(updateModelValueEvent?.[0][0]).toEqual('B');
            expect(wrapper.find('input').element.checked).toBe(false);
        });

        it('object 타입 true-value, false-value를 설정할 수 있다', () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckbox, {
                props: {
                    modelValue: { id: 'A' },
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    trueValue: { id: 'A' },
                    falseValue: { id: 'B' },
                },
            });

            // then
            expect(wrapper.find('input').element.checked).toBe(true);
            expect(wrapper.vm.isChecked).toBe(true);
        });
    });

    describe('v-model ( array )', () => {
        describe('multiple 이 true 인 경우', () => {
            it('modelValue 원소 중 하나라도 trueValue와 일치하면 checkbox 값은 true이다', () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckbox, {
                    props: {
                        multiple: true,
                        modelValue: ['A'],
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        trueValue: 'A',
                    },
                });

                // then
                expect(wrapper.find('input').element.checked).toBe(true);
                expect(wrapper.vm.isChecked).toBe(true);
            });

            it('인풋 값을 true로 업데이트하면 true-value가 modelValue배열에 포함된다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckbox, {
                    props: {
                        multiple: true,
                        modelValue: [],
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        trueValue: 'A',
                    },
                });

                // when
                await wrapper.find('input').trigger('click');

                // then
                const updateModelValueEvent = wrapper.emitted('update:modelValue');
                expect(updateModelValueEvent).toHaveLength(1);
                expect(updateModelValueEvent?.[0][0]).toEqual(['A']);
                expect(wrapper.find('input').element.checked).toBe(true);
            });
        });

        describe('multiple 이 false 인 경우', () => {
            it('modelValue 원소 중에 trueValue와 일치하는 것이 있더라도 checkbox 값은 false이다', () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckbox, {
                    props: {
                        multiple: false,
                        modelValue: ['A'],
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        trueValue: 'A',
                    },
                });

                // then
                expect(wrapper.find('input').element.checked).toBe(false);
            });

            it('인풋 값을 true로 업데이트하면 modelValue가 true-value로 변경된다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckbox, {
                    props: {
                        multiple: false,
                        modelValue: [],
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        trueValue: 'A',
                    },
                });

                // when
                await wrapper.find('input').trigger('click');

                // then
                const updateModelValueEvent = wrapper.emitted('update:modelValue');
                expect(updateModelValueEvent).toHaveLength(1);
                expect(updateModelValueEvent?.[0][0]).toEqual('A');
                expect(wrapper.find('input').element.checked).toBe(true);
            });
        });

        it('array 타입 modelValue를 바꿔서 checkbox 값을 업데이트 할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckbox, {
                props: {
                    multiple: true,
                    modelValue: [],
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    trueValue: 'A',
                },
            });

            // when
            await wrapper.setProps({ modelValue: ['A'] });

            // then
            expect(wrapper.find('input').element.checked).toBe(true);
            expect(wrapper.vm.isChecked).toBe(true);
        });

        it('object array 타입으로 modelValue의 초깃값을 설정할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckbox, {
                props: {
                    multiple: true,
                    modelValue: [{ id: 'A' }],
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    trueValue: { id: 'A' },
                },
            });

            await nextTick();

            // then
            expect(wrapper.find('input').element.checked).toBe(true);
            expect(wrapper.vm.isChecked).toBe(true);
        });

        it('object array 타입으로 modelValue 를 업데이트 할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckbox, {
                props: {
                    multiple: true,
                    modelValue: [],
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    trueValue: { id: 'A' },
                },
            });

            // when
            await wrapper.find('input').trigger('click');

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toHaveLength(1);
            expect(updateModelValueEvent?.[0][0]).toEqual([{ id: 'A' }]);
        });

        it('object array 타입으로 modelValue를 업데이트해서 checkbox 값을 업데이트 할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckbox, {
                props: {
                    multiple: true,
                    modelValue: [],
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    trueValue: { id: 'A' },
                },
            });

            // when
            await wrapper.setProps({ modelValue: [{ id: 'A' }] });

            // then
            expect(wrapper.find('input').element.checked).toBe(true);
            expect(wrapper.vm.isChecked).toBe(true);
        });
    });

    describe('checked', () => {
        it('checked를 설정하면 check 된 상태로 mount 된다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckbox, {
                props: {
                    checked: true,
                },
            });

            // when
            await nextTick();

            // then
            expect(wrapper.find('input').element.checked).toBe(true);
        });

        it('multiple일 때 checked를 설정하면 array에 값이 들어가 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckbox, {
                props: {
                    multiple: true,
                    checked: true,
                    modelValue: [],
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });

            // when
            await nextTick();

            // then
            expect(wrapper.vm.inputValue).toEqual([true]);
        });
    });

    describe('clear', () => {
        describe('multiple 이 true이고 v-model이 array 타입인 경우', () => {
            it('clear 함수를 호출하면 true-value가 제외된 배열로 업데이트된다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckbox, {
                    props: {
                        multiple: true,
                        modelValue: ['A', 'B'],
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        trueValue: 'A',
                    },
                });

                // when
                wrapper.vm.clear();
                await nextTick();

                // then
                expect(wrapper.vm.isChecked).toBe(false);
                expect(wrapper.props('modelValue')).toEqual(['B']);
            });
        });

        describe('multiple 이 false 이거나 v-model이 array 타입이 아닌 경우', () => {
            it('clear 함수를 호출하면 false-value 값으로 업데이트 할 수 있다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckbox, {
                    props: {
                        modelValue: true,
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                wrapper.vm.clear();
                await nextTick();

                // then
                expect(wrapper.find('input').element.checked).toBe(false);
                expect(wrapper.vm.isChecked).toBe(false);
                expect(wrapper.props('modelValue')).toBe(false);
            });
        });
    });

    describe('rules', () => {
        it('required 체크가 가능하다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckbox, {
                props: {
                    modelValue: true,
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    required: true,
                },
            });

            // when
            await nextTick();
            await wrapper.find('input').trigger('click');

            // then
            expect(wrapper.vm.computedMessages).toHaveLength(1);
            expect(wrapper.html()).toContain('required');
        });
    });

    describe('validate', () => {
        it('valid 할 때 validate 함수를 호출하면 true를 반환한다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckbox, {
                props: {
                    modelValue: true,
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    required: true,
                },
            });

            // then
            expect(wrapper.vm.validate()).toBe(true);
        });

        it('invalid 할 때 validate 함수를 호출하면 false를 반환한다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckbox, {
                props: {
                    modelValue: false,
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    required: true,
                },
            });

            // then
            expect(wrapper.vm.validate()).toBe(false);
        });
    });

    describe('before change', () => {
        afterEach(() => {
            vi.restoreAllMocks();
        });

        it('beforeChange 함수에 from, to 인자가 전달된다', async () => {
            // given
            const beforeChange = vi.fn().mockResolvedValue(true);
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckbox, {
                props: {
                    trueValue: 'A',
                    falseValue: 'B',
                    beforeChange,
                },
            });

            // when
            await wrapper.find('input').trigger('click');

            // then
            expect(beforeChange).toHaveBeenCalledWith('B', 'A');
        });

        it('beforeChange 함수가 Promise<true>를 리턴하면 값이 업데이트 된다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckbox, {
                props: {
                    modelValue: false,
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    beforeChange: () => Promise.resolve(true),
                },
            });

            // when
            await wrapper.find('input').trigger('click');

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toHaveLength(1);
            expect(updateModelValueEvent?.[0][0]).toEqual(true);
        });

        it('beforeChange 함수가 Promise<false>를 리턴하면 값이 업데이트 되지 않는다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckbox, {
                props: {
                    modelValue: false,
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    beforeChange: () => Promise.resolve(false),
                },
            });

            // when
            await wrapper.find('input').trigger('click');

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toBeUndefined();
        });
    });

    describe('aria-label', () => {
        it('aria-label을 설정할 수 있다', () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckbox, {
                props: {
                    name: 'checkbox',
                    ariaLabel: 'aria-label',
                },
            });

            // then
            expect(wrapper.find('input').attributes('aria-label')).toBe('aria-label');
        });
    });

    describe('focus / blur', () => {
        it('focus 이벤트를 발생시킬 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckbox);

            // when
            await wrapper.find('input').trigger('focus');

            // then
            expect(wrapper.emitted('focus')).toHaveLength(1);
        });

        it('blur 이벤트를 발생시킬 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckbox);

            // when
            await wrapper.find('input').trigger('blur');

            // then
            expect(wrapper.emitted('blur')).toHaveLength(1);
        });
    });
});
