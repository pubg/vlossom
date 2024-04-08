import { afterEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import VsRadioSet from './../VsRadioSet.vue';

function mountComponent() {
    return mount(VsRadioSet);
}

describe('vs-radio-set', () => {
    describe('options', () => {
        it('primitive options를 설정할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsRadioSet, {
                props: {
                    name: 'test',
                    options: ['A', 'B', 'C'],
                },
            });

            // then
            expect(wrapper.findAll('.vs-radio-item')).toHaveLength(3);
            expect(wrapper.findAll('.vs-radio-item')[0].find('label').text()).toBe('A');
            expect(wrapper.findAll('.vs-radio-item')[1].find('label').text()).toBe('B');
            expect(wrapper.findAll('.vs-radio-item')[2].find('label').text()).toBe('C');
        });

        it('object options를 설정할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsRadioSet, {
                props: {
                    name: 'test',
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
            expect(wrapper.findAll('.vs-radio-item')).toHaveLength(3);
            expect(wrapper.findAll('.vs-radio-item')[0].find('label').text()).toBe('A');
            expect(wrapper.findAll('.vs-radio-item')[1].find('label').text()).toBe('B');
            expect(wrapper.findAll('.vs-radio-item')[2].find('label').text()).toBe('C');
        });

        it('options가 변경됐을 때 radio-set value 중 일치하는 값이 있으면 선택 상태로 남는다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsRadioSet, {
                props: {
                    name: 'test',
                    modelValue: 'C',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    options: ['A', 'B', 'C'],
                },
            });

            // when
            await wrapper.setProps({ options: ['C', 'D'] });

            // then
            expect(wrapper.vm.modelValue).toBe('C');
            expect(wrapper.findAll('.vs-radio-item')[0].find('label').text()).toBe('C');
            expect(wrapper.findAll('.vs-radio-item')[1].find('label').text()).toBe('D');
            expect(wrapper.findAll('.vs-radio-item')[0].find('input').element.checked).toBe(true);
        });

        it('options가 변경됐을 때 radio-set value 중 일치하는 값이 없으면 선택 해제한다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsRadioSet, {
                props: {
                    name: 'test',
                    modelValue: 'C',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    options: ['A', 'B', 'C'],
                },
            });

            // when
            await wrapper.setProps({ options: ['D', 'E', 'F', 'G'] });

            // then
            expect(wrapper.vm.modelValue).toBe(null);
            expect(wrapper.findAll('.vs-radio-item')[0].find('label').text()).toBe('D');
            expect(wrapper.findAll('.vs-radio-item')[1].find('label').text()).toBe('E');
            expect(wrapper.findAll('.vs-radio-item')[2].find('label').text()).toBe('F');
            expect(wrapper.findAll('.vs-radio-item')[3].find('label').text()).toBe('G');
            expect(wrapper.findAll('.vs-radio-item')[0].find('input').element.checked).toBe(false);
            expect(wrapper.findAll('.vs-radio-item')[1].find('input').element.checked).toBe(false);
            expect(wrapper.findAll('.vs-radio-item')[2].find('input').element.checked).toBe(false);
            expect(wrapper.findAll('.vs-radio-item')[3].find('input').element.checked).toBe(false);
        });
    });

    describe('v-model', () => {
        describe('primitive options', () => {
            it('modelValue의 초깃값을 설정할 수 있다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsRadioSet, {
                    props: {
                        name: 'test',
                        modelValue: 'A',
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        options: ['A', 'B', 'C'],
                    },
                });

                // then
                expect(wrapper.findAll('.vs-radio-item')[0].find('input').element.checked).toBe(true);
                expect(wrapper.findAll('.vs-radio-item')[1].find('input').element.checked).toBe(false);
                expect(wrapper.findAll('.vs-radio-item')[2].find('input').element.checked).toBe(false);
            });

            it('modelValue를 업데이트 해서 선택을 변경할 수 있다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsRadioSet, {
                    props: {
                        name: 'test',
                        modelValue: 'A',
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        options: ['A', 'B', 'C'],
                    },
                });

                // when
                await wrapper.setProps({ modelValue: 'B' });

                // then
                expect(wrapper.findAll('.vs-radio-item')[0].find('input').element.checked).toBe(false);
                expect(wrapper.findAll('.vs-radio-item')[1].find('input').element.checked).toBe(true);
                expect(wrapper.findAll('.vs-radio-item')[2].find('input').element.checked).toBe(false);
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
                const wrapper: ReturnType<typeof mountComponent> = mount(VsRadioSet, {
                    props: {
                        name: 'test',
                        modelValue: 'a',
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        ...optionProps,
                    },
                });

                // then
                expect(wrapper.findAll('.vs-radio-item')[0].find('input').element.checked).toBe(true);
                expect(wrapper.findAll('.vs-radio-item')[1].find('input').element.checked).toBe(false);
                expect(wrapper.findAll('.vs-radio-item')[2].find('input').element.checked).toBe(false);
            });

            it('modelValue를 업데이트 해서 선택을 변경할 수 있다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsRadioSet, {
                    props: {
                        name: 'test',
                        modelValue: 'a',
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        ...optionProps,
                    },
                });

                // when
                await wrapper.setProps({ modelValue: 'b' });

                // then
                expect(wrapper.findAll('.vs-radio-item')[0].find('input').element.checked).toBe(false);
                expect(wrapper.findAll('.vs-radio-item')[1].find('input').element.checked).toBe(true);
                expect(wrapper.findAll('.vs-radio-item')[2].find('input').element.checked).toBe(false);
            });
        });
    });

    describe('clear', () => {
        it('clear 함수를 호출하면 modelValue를 null로 초기화 할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsRadioSet, {
                props: {
                    name: 'test',
                    modelValue: 'A',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    options: ['A', 'B', 'C'],
                },
            });

            // when
            await wrapper.vm.clear();

            // then
            expect(wrapper.vm.modelValue).toBe(null);
            expect(wrapper.findAll('.vs-radio-item')[0].find('input').element.checked).toBe(false);
            expect(wrapper.findAll('.vs-radio-item')[1].find('input').element.checked).toBe(false);
            expect(wrapper.findAll('.vs-radio-item')[2].find('input').element.checked).toBe(false);
        });
    });

    describe('rules', () => {
        it('required 체크가 가능하다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsRadioSet, {
                props: {
                    name: 'test',
                    modelValue: null,
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    options: ['A', 'B', 'C'],
                    required: true,
                },
            });

            // when
            await wrapper.setProps({ modelValue: 'B' });
            await wrapper.setProps({ modelValue: null });

            // then
            expect(wrapper.vm.computedMessages).toHaveLength(1);
            expect(wrapper.html()).toContain('required');
        });
    });

    describe('validate', () => {
        it('valid 할 때 validate 함수를 호출하면 true를 반환한다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsRadioSet, {
                props: {
                    name: 'test',
                    options: ['A', 'B', 'C'],
                    rules: [() => ''],
                },
            });

            // when
            const result = wrapper.vm.validate();
            await nextTick();

            // then
            expect(result).toBe(true);
            expect(wrapper.vm.computedMessages).toHaveLength(0);
        });

        it('invalid 할 때 validate 함수를 호출하면 false를 반환한다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsRadioSet, {
                props: {
                    name: 'test',
                    options: ['A', 'B', 'C'],
                    rules: [() => 'error'],
                },
            });

            // when
            const result = wrapper.vm.validate();
            await nextTick();

            // then
            expect(result).toBe(false);
            expect(wrapper.vm.computedMessages).toHaveLength(1);
            expect(wrapper.html()).toContain('error');
        });

        // document.querySelector(`input[name="${name.value}"]:checked`) 에러 발생으로 인해 테스트 제외
        describe.skip('required check', () => {
            let wrapper: ReturnType<typeof mountComponent>;

            afterEach(() => {
                wrapper.unmount();
            });

            it('required 상태에서 checked된 radio가 있으면 validation true', async () => {
                // given
                wrapper = mount(VsRadioSet, {
                    props: {
                        name: 'test',
                        options: ['A', 'B', 'C'],
                        modelValue: 'B',
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        required: true,
                    },
                    attachTo: document.body,
                });

                // when
                const result = wrapper.vm.validate();
                await nextTick();

                // then
                expect(result).toBe(true);
                expect(wrapper.vm.computedMessages).toHaveLength(0);
            });

            it('required 상태에서 unchecked이면 validation false', async () => {
                // given
                wrapper = mount(VsRadioSet, {
                    props: {
                        name: 'test',
                        options: ['A', 'B', 'C'],
                        modelValue: null,
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        required: true,
                    },
                    attachTo: document.body,
                });

                // when
                const result = wrapper.vm.validate();
                await nextTick();

                // then
                expect(result).toBe(false);
                expect(wrapper.vm.computedMessages).toHaveLength(1);
                expect(wrapper.html()).toContain('required');
            });
        });
    });

    describe('before change', () => {
        it('beforeChange 함수에 from, to 인자가 전달된다 ', async () => {
            // given
            const beforeChange = vi.fn().mockResolvedValue(true);
            const wrapper: ReturnType<typeof mountComponent> = mount(VsRadioSet, {
                props: {
                    name: 'radio',
                    modelValue: 'A',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    options: ['A', 'B', 'C'],
                    beforeChange,
                },
            });

            // when
            await wrapper.find('input[value="C"]').trigger('change');

            // then
            expect(beforeChange).toHaveBeenCalledWith('A', 'C', 'C');
        });

        it('beforeChange 함수가 Promise<true>를 리턴하면 값이 업데이트 된다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsRadioSet, {
                props: {
                    name: 'test',
                    modelValue: 'A',
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
            expect(updateModelValueEvent?.[0]).toEqual(['B']);
        });

        it('beforeChange 함수가 Promise<false>를 리턴하면 값이 업데이트 되지 않는다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsRadioSet, {
                props: {
                    name: 'test',
                    modelValue: 'A',
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
            const wrapper: ReturnType<typeof mountComponent> = mount(VsRadioSet, {
                props: {
                    name: 'test',
                    options: ['A', 'B', 'C'],
                },
            });

            // when
            await wrapper.find('input[value="A"]').trigger('focus');

            // then
            const focusEvent = wrapper.emitted('focus');
            expect(focusEvent).toHaveLength(1);
            expect(focusEvent?.[0][0]).toEqual('A');
        });

        it('blur 이벤트를 발생시킬 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsRadioSet, {
                props: {
                    name: 'test',
                    options: ['A', 'B', 'C'],
                },
            });

            // when
            await wrapper.find('input[value="A"]').trigger('blur');

            // then
            const blurEvent = wrapper.emitted('blur');
            expect(blurEvent).toHaveLength(1);
            expect(blurEvent?.[0][0]).toEqual('A');
        });
    });
});
