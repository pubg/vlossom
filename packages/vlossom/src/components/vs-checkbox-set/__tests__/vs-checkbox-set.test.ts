import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import VsCheckboxSet from '../VsCheckboxSet.vue';

function mountComponent() {
    return mount(VsCheckboxSet);
}

describe('vs-checkbox-set', () => {
    describe('options', () => {
        it('primitive options를 설정할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxSet, {
                props: {
                    options: ['A', 'B', 'C'],
                },
            });

            // then
            expect(wrapper.findAll('input')).toHaveLength(3);
            expect(wrapper.html()).toContain('A');
            expect(wrapper.html()).toContain('B');
            expect(wrapper.html()).toContain('C');
        });

        it('object options를 설정할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxSet, {
                props: {
                    options: [
                        { label: 'A', value: 'a' },
                        { label: 'B', value: 'b' },
                        { label: 'C', value: 'c' },
                    ],
                    optionLabel: 'label',
                    optionValue: 'value',
                },
            });

            // then
            expect(wrapper.findAll('input')).toHaveLength(3);
            expect(wrapper.html()).toContain('A');
            expect(wrapper.html()).toContain('B');
            expect(wrapper.html()).toContain('C');
        });

        it('options가 변경되면 checkbox-set value 중 일치하는 값은 남는다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxSet, {
                props: {
                    modelValue: ['B', 'C'],
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    options: ['A', 'B', 'C'],
                },
            });

            // when
            await wrapper.setProps({ options: ['C', 'D', 'E'] });

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toHaveLength(1);
            expect(updateModelValueEvent?.[0]).toEqual([['C']]);
        });

        it('options가 변경되어도 이전 값과 deep equal 하면 checkbox set value가 그대로 유지된다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxSet, {
                props: {
                    modelValue: ['A'],
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    options: ['A', 'B', 'C'],
                },
            });

            // when
            await wrapper.setProps({ options: ['A', 'B', 'C'] });

            // then
            expect(wrapper.emitted('update:modelValue')).toBeUndefined();
        });
    });

    describe('v-model', () => {
        describe('primitive options', () => {
            it('modelValue의 초깃값을 설정할 수 있다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxSet, {
                    props: {
                        modelValue: ['A'],
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        options: ['A', 'B', 'C'],
                    },
                });

                // then
                const checked = wrapper.findAll('input').filter((e) => e.element.checked);
                expect(checked).toHaveLength(1);
                expect(checked[0].element.value).toBe('A');
            });

            it('modelValue를 업데이트 할 수 있다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxSet, {
                    props: {
                        modelValue: ['A'],
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        options: ['A', 'B', 'C'],
                    },
                });

                // when
                await wrapper.find('input[value="B"]').setValue(true);

                // then
                const updateModelValueEvent = wrapper.emitted('update:modelValue');
                expect(updateModelValueEvent).toHaveLength(1);
                expect(updateModelValueEvent?.[0]).toEqual([['A', 'B']]);
            });

            it('modelValue를 바꿔서 checkbox 값을 업데이트 할 수 있다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxSet, {
                    props: {
                        modelValue: ['A'],
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        options: ['A', 'B', 'C'],
                    },
                });

                // when
                await wrapper.setProps({ modelValue: ['B'] });

                // then
                const checked = wrapper.findAll('input').filter((e) => e.element.checked);
                expect(checked).toHaveLength(1);
                expect(checked[0].element.value).toBe('B');
            });
        });

        describe('object options', () => {
            const optionProps = {
                options: [
                    { label: 'A', value: 'a' },
                    { label: 'B', value: 'b' },
                    { label: 'C', value: 'c' },
                ],
                optionLabel: 'label',
                optionValue: 'value',
            };

            it('modelValue의 초깃값을 설정할 수 있다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxSet, {
                    props: {
                        modelValue: ['a'],
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        ...optionProps,
                    },
                });

                // then
                const checked = wrapper.findAll('input').filter((e) => e.element.checked);
                expect(checked).toHaveLength(1);
                expect(checked[0].element.value).toBe('a');
            });

            it('modelValue를 업데이트 할 수 있다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxSet, {
                    props: {
                        modelValue: ['a'],
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        ...optionProps,
                    },
                });

                // when
                await wrapper.find('input[value="b"]').setValue(true);

                // then
                const updateModelValueEvent = wrapper.emitted('update:modelValue');
                expect(updateModelValueEvent).toHaveLength(1);
                expect(updateModelValueEvent?.[0]).toEqual([['a', 'b']]);
            });

            it('modelValue를 바꿔서 checkbox 값을 업데이트 할 수 있다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxSet, {
                    props: {
                        modelValue: ['a'],
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        ...optionProps,
                    },
                });

                // when
                await wrapper.setProps({ modelValue: ['b'] });

                // then
                const checked = wrapper.findAll('input').filter((e) => e.element.checked);
                expect(checked).toHaveLength(1);
                expect(checked[0].element.value).toBe('b');
            });
        });
    });

    describe('clear', () => {
        it('clear 함수를 호출하면 modelValue를 빈 배열로 초기화 할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxSet, {
                props: {
                    modelValue: ['A'],
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    options: ['A', 'B', 'C'],
                },
            });

            // when
            await wrapper.vm.clear();

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toHaveLength(1);
            expect(updateModelValueEvent?.[0]).toEqual([[]]);
        });
    });

    describe('rules', () => {
        it('required 체크가 가능하다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxSet, {
                props: {
                    modelValue: ['A'],
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    options: ['A', 'B', 'C'],
                    required: true,
                },
            });

            // when
            await nextTick();
            await wrapper.find('input[value="A"]').setValue(false);

            // then
            expect(wrapper.vm.computedMessages).toHaveLength(1);
            expect(wrapper.html()).toContain('required');
        });
    });

    describe('validate', () => {
        it('valid 할 때 validate 함수를 호출하면 true를 반환한다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxSet, {
                props: {
                    modelValue: ['A'],
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    options: ['A', 'B', 'C'],
                    required: true,
                },
            });

            // then
            expect(wrapper.vm.validate()).toBe(true);
        });

        it('invalid 할 때 validate 함수를 호출하면 false를 반환한다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxSet, {
                props: {
                    modelValue: ['A'],
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    options: ['A', 'B', 'C'],
                    required: true,
                },
            });

            // when
            await nextTick();
            await wrapper.find('input[value="A"]').setValue(false);

            // then
            expect(wrapper.vm.validate()).toBe(false);
        });
    });

    describe('before change', () => {
        it('beforeChange 함수가 Promise<true>를 리턴하면 값이 업데이트 된다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxSet, {
                props: {
                    modelValue: ['A'],
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    options: ['A', 'B', 'C'],
                    beforeChange: () => Promise.resolve(true),
                },
            });

            // when
            await wrapper.find('input[value="B"]').setValue(true);

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toHaveLength(1);
            expect(updateModelValueEvent?.[0]).toEqual([['A', 'B']]);
        });

        it('beforeChange 함수가 Promise<false>를 리턴하면 값이 업데이트 되지 않는다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxSet, {
                props: {
                    modelValue: ['A'],
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    options: ['A', 'B', 'C'],
                    beforeChange: () => Promise.resolve(false),
                },
            });

            // when
            await wrapper.find('input[value="B"]').setValue(true);

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toBeUndefined();
        });
    });

    describe('focus / blur', () => {
        it('focus 이벤트를 발생시킬 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxSet, {
                props: {
                    options: ['A', 'B', 'C'],
                },
            });

            // when
            await wrapper.find('input[value="A"]').trigger('focus');

            // then
            const focusEvent = wrapper.emitted('focus');
            expect(focusEvent).toHaveLength(1);
            expect(focusEvent?.[0]).toEqual(['A']);
        });

        it('blur 이벤트를 발생시킬 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxSet, {
                props: {
                    options: ['A', 'B', 'C'],
                },
            });

            // when
            await wrapper.find('input[value="A"]').trigger('blur');

            // then
            const blurEvent = wrapper.emitted('blur');
            expect(blurEvent).toHaveLength(1);
            expect(blurEvent?.[0]).toEqual(['A']);
        });
    });
});
