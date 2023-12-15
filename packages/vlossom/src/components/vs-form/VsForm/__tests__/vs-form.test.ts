import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest';
import VsForm from './../VsForm.vue';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

function mountComponent() {
    return mount(VsForm);
}

describe('vs-form', () => {
    let wrapper: ReturnType<typeof mountComponent>;

    beforeEach(() => {
        wrapper = mount(VsForm, {
            props: {
                changed: false,
                'onUpdate:changed': (v: boolean) => wrapper.setProps({ changed: v }),
                valid: false,
                'onUpdate:valid': (v: boolean) => wrapper.setProps({ valid: v }),
            },
        });
    });

    afterEach(() => {
        wrapper.unmount();
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
            // given
            wrapper.vm.validObj = {
                test: false,
            };

            // when
            await wrapper.vm.validate();

            // then
            expect(wrapper.emitted('update:valid')?.[0][0]).toBe(false);
        });

        it('onError 함수가 props로 전달되고 form의 값이 유효하지 않으면 onError 함수를 실행한다', async () => {
            // given
            wrapper.vm.validObj = {
                test: false,
            };
            wrapper.vm.labelObj = {
                test: 'test',
            };
            const onError = vi.fn();
            wrapper.setProps({ onError });

            // when
            const valid = await wrapper.vm.validate();

            // then
            expect(valid).toBe(false);
            expect(onError).toBeCalledTimes(1);
            expect(onError).toBeCalledWith(['test']);
        });
    });

    describe('changed', () => {
        it('변경이 있으면 update:changed event가 emit된다', async () => {
            // when
            wrapper.vm.changedObj = {
                test: true,
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
