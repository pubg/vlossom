import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import VsCheckboxSet from '../VsCheckboxSet.vue';

function mountComponent() {
    return mount(VsCheckboxSet);
}

describe('vs-checkbox-set', () => {
    describe('options', () => {
        it('options를 설정할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxSet, {
                props: {
                    options: ['A', 'B', 'C'],
                },
            });

            // then
            expect(wrapper.findAll('input')).toHaveLength(3);
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
            const options = [
                { label: 'A', value: 'a' },
                { label: 'B', value: 'b' },
                { label: 'C', value: 'c' },
            ];

            it('modelValue의 초깃값을 설정할 수 있다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxSet, {
                    props: {
                        modelValue: ['a'],
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        options,
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
                        options,
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
                        options,
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
                await wrapper.find('input[value="A"').setValue(false);

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

        // describe('before change', () => {
        //     it('beforeChange 함수가 Promise<true>를 리턴하면 값이 업데이트 된다', async () => {
        //         // given
        //         const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxSet, {
        //             props: {
        //                 modelValue: false,
        //                 'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
        //                 beforeChange: () => Promise.resolve(true),
        //             },
        //         });

        //         // when
        //         await wrapper.find('input').setValue(true);

        //         // then
        //         const updateModelValueEvent = wrapper.emitted('update:modelValue');
        //         expect(updateModelValueEvent).toHaveLength(1);
        //         expect(updateModelValueEvent?.[0]).toEqual([true]);
        //     });

        //     it('beforeChange 함수가 Promise<false>를 리턴하면 값이 업데이트 되지 않는다', async () => {
        //         // given
        //         const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxSet, {
        //             props: {
        //                 modelValue: false,
        //                 'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
        //                 beforeChange: () => Promise.resolve(false),
        //             },
        //         });

        //         // when
        //         await wrapper.find('input').setValue(true);

        //         // then
        //         const updateModelValueEvent = wrapper.emitted('update:modelValue');
        //         expect(updateModelValueEvent).toBeUndefined();
        //     });
        // });
    });
});