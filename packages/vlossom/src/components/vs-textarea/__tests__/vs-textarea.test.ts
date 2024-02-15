import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import VsTextarea from '../VsTextarea.vue';

function mountComponent() {
    return mount(VsTextarea);
}

describe('vs-textarea', () => {
    describe('v-model', () => {
        it('modelValue의 string 타입 초깃값을 설정할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTextarea, {
                props: {
                    modelValue: 'initialText',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });

            // then
            expect(wrapper.find('textarea').element.value).toBe('initialText');
        });

        it('modelValue를 업데이트 할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTextarea, {
                props: {
                    modelValue: '',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });

            // when
            await wrapper.find('textarea').setValue('test');

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toHaveLength(1);
            expect(updateModelValueEvent?.[0]).toEqual(['test']);
        });

        it('modelValue를 바꿔서 textarea 값을 업데이트 할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTextarea, {
                props: {
                    modelValue: '',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });

            // when
            await wrapper.setProps({ modelValue: 'test' });

            // then
            expect(wrapper.find('textarea').element.value).toBe('test');
        });

        it('modelValue가 null이면 빈 문자열로 가공해준다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTextarea, {
                props: {
                    // @ts-expect-error: for null test
                    modelValue: null,
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });

            // when
            await nextTick();

            // then
            expect(wrapper.find('textarea').element.value).toBe('');
            expect(wrapper.props('modelValue')).toBe('');
        });
    });

    describe('v-model modifier', () => {
        it('capitalize', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTextarea, {
                props: {
                    modelValue: '',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    modelModifiers: {
                        capitalize: true,
                    },
                },
            });

            // when
            await wrapper.find('textarea').setValue('test');

            // then
            expect(wrapper.props('modelValue')).toBe('Test');
        });

        it('lower', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTextarea, {
                props: {
                    modelValue: '',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    modelModifiers: {
                        lower: true,
                    },
                },
            });

            // when
            await wrapper.find('textarea').setValue('TEST');

            // then
            expect(wrapper.props('modelValue')).toBe('test');
        });

        it('upper', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTextarea, {
                props: {
                    modelValue: '',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    modelModifiers: {
                        upper: true,
                    },
                },
            });

            // when
            await wrapper.find('textarea').setValue('test');

            // then
            expect(wrapper.props('modelValue')).toBe('TEST');
        });
    });

    describe('clear', () => {
        it('clear 함수를 호출하면 textarea 값을 초기화 할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTextarea, {
                props: {
                    modelValue: 'initialText',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });

            // when
            wrapper.vm.clear();
            await nextTick();

            // then
            expect(wrapper.find('textarea').element.value).toBe('');
        });
    });

    describe('focus / blur', () => {
        it('focus 이벤트를 발생시킬 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTextarea);

            // when
            await wrapper.find('textarea').trigger('focus');

            // then
            expect(wrapper.emitted('focus')).toHaveLength(1);
        });

        it('blur 이벤트를 발생시킬 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTextarea);

            // when
            await wrapper.find('textarea').trigger('blur');

            // then
            expect(wrapper.emitted('blur')).toHaveLength(1);
        });
    });

    describe('enter', () => {
        it('enter 이벤트를 발생시킬 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTextarea);

            // when
            await wrapper.find('textarea').trigger('keyup.enter');

            // then
            expect(wrapper.emitted('enter')).toHaveLength(1);
        });
    });

    describe('rules', () => {
        it('required 체크가 가능하다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTextarea, {
                props: {
                    modelValue: 'test',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    required: true,
                },
            });

            // when
            await nextTick();
            await wrapper.find('textarea').setValue('');

            // then
            expect(wrapper.vm.computedMessages).toHaveLength(1);
            expect(wrapper.html()).toContain('required');
        });

        it('max 체크가 가능하다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTextarea, {
                props: {
                    modelValue: '',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    max: 3,
                },
            });

            // when
            await nextTick();
            await wrapper.find('textarea').setValue('test');

            // then
            expect(wrapper.vm.computedMessages).toHaveLength(1);
            expect(wrapper.html()).toContain('max length: 3');
        });

        it('min 체크가 가능하다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTextarea, {
                props: {
                    modelValue: 'test',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    min: 3,
                },
            });

            // when
            await nextTick();
            await wrapper.find('textarea').setValue('te');

            // then
            expect(wrapper.vm.computedMessages).toHaveLength(1);
            expect(wrapper.html()).toContain('min length: 3');
        });
    });

    describe('validate', () => {
        it('valid 할 때 validate 함수를 호출하면 true를 리턴한다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTextarea, {
                props: {
                    modelValue: 'test',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    required: true,
                },
            });

            // then
            expect(wrapper.vm.validate()).toBe(true);
        });

        it('invalid 할 때 validate 함수를 호출하면 false를 리턴한다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTextarea, {
                props: {
                    modelValue: '',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    required: true,
                },
            });

            // then
            expect(wrapper.vm.validate()).toBe(false);
        });
    });
});
