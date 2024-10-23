import { beforeEach, afterEach, describe, it, expect } from 'vitest';
import { defineComponent, inject, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { useFormProvide } from '@/composables';
import { VS_FORM, VsFormProvide } from '@/declaration';
import VsForm from './../VsForm.vue';

describe('vs-form', () => {
    let wrapper = mount(VsForm);
    const TestSlotComponent = defineComponent({
        template: `
            <div>
                disabled: {{ disabled }}
                readonly: {{ readonly }}
            </div>`,
        setup() {
            const { disabled, readonly } = inject<VsFormProvide>(
                VS_FORM,
                useFormProvide().getDefaultFormProvide(), // for no provide error
            );
            return {
                disabled,
                readonly,
            };
        },
    });
    beforeEach(() => {
        wrapper = mount(VsForm, {
            props: {
                changed: false,
                'onUpdate:changed': (v: boolean) => wrapper.setProps({ changed: v }),
                valid: false,
                'onUpdate:valid': (v: boolean) => wrapper.setProps({ valid: v }),
            },
            slots: {
                default: TestSlotComponent,
            },
        });
    });

    afterEach(() => {
        wrapper.unmount();
    });

    describe('autocomplete', () => {
        it('form element에 autocomplete를 설정할 수 있다', async () => {
            // when
            await wrapper.setProps({ autocomplete: true });

            // then
            expect(wrapper.find('form').attributes('autocomplete')).toBe('on');
        });
    });

    describe('validate', () => {
        it('validate 함수를 실행하면, validateFlag가 바뀐다', async () => {
            // when
            const valid = await wrapper.vm.validate();

            // then
            expect(wrapper.vm.validateFlag).toBe(true);
            expect(valid).toBe(true);
        });

        it('valid 여부가 바뀌면 update:valid event가 emit된다', async () => {
            // when
            wrapper.vm.validObj = {
                testId: false,
            };
            await nextTick();

            // then
            expect(wrapper.emitted('update:valid')?.[0][0]).toBe(false);
        });

        it('유효하지 않은 input의 id를 error 이벤트로 emit한다', async () => {
            // given
            wrapper.vm.validObj = {
                testId: false,
            };

            // when
            const valid = await wrapper.vm.validate();

            // then
            expect(valid).toBe(false);
            expect(wrapper.emitted('error')?.[0][0]).toEqual(['testId']);
        });
    });

    describe('disabled', () => {
        it('disabled의 기본값은 false이다', () => {
            expect(wrapper.html()).toContain('disabled: false');
        });

        it('disabled props가 설정되면 disabled 값을 provide 객체로 자식 Component(TestSlotComponent)에 전달한다', async () => {
            // when
            await wrapper.setProps({ disabled: true });

            // then
            expect(wrapper.html()).toContain('disabled: true');
        });
    });

    describe('readonly', () => {
        it('readonly의 기본값은 false이다', () => {
            expect(wrapper.html()).toContain('readonly: false');
        });

        it('readonly props가 설정되면 readonly 값을 provide 객체로 자식 Component(TestSlotComponent)에 전달한다', async () => {
            // when
            await wrapper.setProps({ readonly: true });

            // then
            expect(wrapper.html()).toContain('readonly: true');
        });
    });

    describe('changed', () => {
        it('변경이 있으면 update:changed event가 emit된다', async () => {
            // when
            wrapper.vm.changedObj = {
                testId: true,
            };
            await nextTick();

            // then
            expect(wrapper.emitted('update:changed')?.[0][0]).toBe(true);
        });
    });

    describe('clear', () => {
        it('clear 함수를 실행하면, clearFlag가 바뀐다', async () => {
            // when
            await wrapper.vm.clear();

            // then
            expect(wrapper.vm.clearFlag).toBe(true);
        });
    });
});
