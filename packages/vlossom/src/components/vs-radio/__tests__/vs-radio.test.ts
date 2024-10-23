import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import VsRadio from './../VsRadio.vue';

describe('vs-radio', () => {
    describe('checked', () => {
        it('checked 속성을 전달해서 처음부터 선택 상태로 만들 수 있다', async () => {
            // given
            const wrapper = mount(VsRadio, {
                props: {
                    name: 'radio',
                    radioValue: 'test',
                    checked: true,
                },
            });

            await nextTick();

            // then
            expect(wrapper.vm.isChecked).toBe(true);
            expect(wrapper.find('input').element.checked).toBe(true);
        });
    });

    describe('v-model', () => {
        it('modelValue의 초깃값을 설정할 수 있다', async () => {
            // given
            const wrapper = mount(VsRadio, {
                props: {
                    name: 'radio',
                    radioValue: 'test',
                    modelValue: 'test',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });

            // then
            expect(wrapper.vm.isChecked).toBe(true);
            expect(wrapper.find('input').element.checked).toBe(true);
        });

        it('modelValue를 변경해서 선택할 수 있다', async () => {
            // given
            const wrapper = mount(VsRadio, {
                props: {
                    name: 'radio',
                    radioValue: 'A',
                    modelValue: 'B',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });

            // when
            await wrapper.setProps({ modelValue: 'A' });

            // then
            expect(wrapper.vm.isChecked).toBe(true);
            expect(wrapper.find('input').element.checked).toBe(true);
        });

        it('modelValue를 변경해서 선택 해제할 수 있다', async () => {
            // given
            const wrapper = mount(VsRadio, {
                props: {
                    name: 'radio',
                    radioValue: 'A',
                    modelValue: 'A',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });

            // when
            await wrapper.setProps({ modelValue: 'B' });

            // then
            expect(wrapper.vm.isChecked).toBe(false);
            expect(wrapper.find('input').element.checked).toBe(false);
        });
    });

    describe('clear', () => {
        it('clear 함수를 호출하면 null 값으로 업데이트 된다', async () => {
            // given
            const wrapper = mount(VsRadio, {
                props: {
                    name: 'radio',
                    radioValue: 'test',
                    modelValue: 'test',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });

            // when
            wrapper.vm.clear();
            await nextTick();

            // then
            expect(wrapper.props('modelValue')).toBe(null);
            expect(wrapper.vm.isChecked).toBe(false);
            expect(wrapper.find('input').element.checked).toBe(false);
        });
    });

    describe('validate', () => {
        it('valid 할 때 validate 함수를 호출하면 true를 반환한다', async () => {
            // given
            const wrapper = mount(VsRadio, {
                props: {
                    name: 'radio',
                    radioValue: 'test',
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
            const wrapper = mount(VsRadio, {
                props: {
                    name: 'radio',
                    radioValue: 'test',
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

        describe('required check', () => {
            let wrapper = mount(VsRadio);

            afterEach(() => {
                wrapper.unmount();
            });

            it('required 상태에서 checked이면 validation true', async () => {
                // given
                wrapper = mount(VsRadio, {
                    props: {
                        name: 'radio',
                        radioValue: 'test',
                        required: true,
                        checked: true,
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
                wrapper = mount(VsRadio, {
                    props: {
                        name: 'radio',
                        radioValue: 'test',
                        required: true,
                        checked: false,
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

    describe('aria-label', () => {
        it('aria-label을 설정할 수 있다', () => {
            // given
            const wrapper = mount(VsRadio, {
                props: {
                    name: 'radio',
                    radioValue: 'test',
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
            const wrapper = mount(VsRadio, {
                props: {
                    name: 'radio',
                    radioValue: 'test',
                },
            });

            // when
            await wrapper.find('input').trigger('focus');

            // then
            expect(wrapper.emitted('focus')).toHaveLength(1);
        });

        it('blur 이벤트를 발생시킬 수 있다', async () => {
            // given
            const wrapper = mount(VsRadio, {
                props: {
                    name: 'radio',
                    radioValue: 'test',
                },
            });

            // when
            await wrapper.find('input').trigger('blur');

            // then
            expect(wrapper.emitted('blur')).toHaveLength(1);
        });
    });
});

describe('vs-radio (multiple inputs)', () => {
    let radio1 = mount(VsRadio);
    let radio2 = mount(VsRadio);

    beforeEach(() => {
        radio1 = mount(VsRadio, {
            props: {
                name: 'radio',
                radioValue: 'A',
                modelValue: null,
                'onUpdate:modelValue': (e) => radio1.setProps({ modelValue: e }),
            },
        });

        radio2 = mount(VsRadio, {
            props: {
                name: 'radio',
                radioValue: 'B',
                modelValue: null,
                'onUpdate:modelValue': (e) => radio2.setProps({ modelValue: e }),
            },
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('처음에는 아무 radio도 선택되어 있지 않다', () => {
        // then
        expect(radio1.vm.isChecked).toBe(false);
        expect(radio1.find('input').element.checked).toBe(false);
        expect(radio2.vm.isChecked).toBe(false);
        expect(radio2.find('input').element.checked).toBe(false);
    });

    it('초깃값을 설정하면 해당 radio는 선택되어 있다', () => {
        // given
        const radio3 = mount(VsRadio, {
            props: {
                name: 'radio',
                radioValue: 'C',
                modelValue: 'C',
                'onUpdate:modelValue': (e) => radio3.setProps({ modelValue: e }),
            },
        });

        // then
        expect(radio3.vm.isChecked).toBe(true);
        expect(radio3.find('input').element.checked).toBe(true);
        expect(radio1.vm.isChecked).toBe(false);
        expect(radio1.find('input').element.checked).toBe(false);
        expect(radio2.vm.isChecked).toBe(false);
        expect(radio2.find('input').element.checked).toBe(false);
    });

    it('modelValue가 변경되면 해당 radio가 선택된다', async () => {
        // when
        // change modelValue to 'A'
        await radio1.setProps({ modelValue: 'A' });
        await radio2.setProps({ modelValue: 'A' });

        // then
        expect(radio1.vm.isChecked).toBe(true);
        expect(radio1.find('input').element.checked).toBe(true);
        expect(radio2.vm.isChecked).toBe(false);
        expect(radio2.find('input').element.checked).toBe(false);
    });

    it('required를 설정하고 validate 해볼 수 있다', async () => {
        // given
        await radio1.setProps({ required: true });
        await radio2.setProps({ required: true });
        await radio1.setProps({ modelValue: 'A' });
        await radio2.setProps({ modelValue: 'A' });
        await radio1.setProps({ modelValue: null });
        await radio2.setProps({ modelValue: null });

        // when
        const result = radio1.vm.validate();

        // then
        expect(result).toBe(false);
        expect(radio1.vm.computedMessages).toHaveLength(1);
        expect(radio1.html()).toContain('required');
        expect(radio2.vm.computedMessages).toHaveLength(1);
        expect(radio2.html()).toContain('required');
    });
});
