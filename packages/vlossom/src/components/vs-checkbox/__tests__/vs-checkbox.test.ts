import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import VsCheckbox from '../VsCheckbox.vue';

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
            await wrapper.find('input').setValue(true);

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toHaveLength(1);
            expect(updateModelValueEvent?.[0]).toEqual([true]);
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
            await wrapper.find('input').setValue(true);

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toHaveLength(1);
            expect(updateModelValueEvent?.[0]).toEqual(['A']);
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
            await wrapper.find('input').setValue(false);

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toHaveLength(1);
            expect(updateModelValueEvent?.[0]).toEqual(['B']);
        });
    });

    describe('clear', () => {
        it('clear 함수를 호출하면 input 값을 초기화 할 수 있다', async () => {
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
            expect(wrapper.props('modelValue')).toBe(false);
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
            await wrapper.find('input').setValue(false);

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
            await wrapper.find('input').setValue(true);

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toHaveLength(1);
            expect(updateModelValueEvent?.[0]).toEqual([true]);
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
            await wrapper.find('input').setValue(true);

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toBeUndefined();
        });
    });
});
