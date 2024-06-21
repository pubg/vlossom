import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, nextTick, ref } from 'vue';
import { useFormProvide, useInputForm } from '@/composables';
import { VS_FORM, type VsFormProvide } from '@/declaration';

describe('form-composable', () => {
    // parameters
    const label = ref('Test label');
    const valid = ref(false);
    const changed = ref(false);
    const validateSpy = vi.fn(() => true);
    const clearSpy = vi.fn();

    const TestInputComponent = defineComponent({
        render: () => null,
        setup() {
            const id = ref('input-id');
            const { formDisabled, formReadonly } = useInputForm(id, valid, changed, validateSpy, clearSpy);
            return { id, formDisabled, formReadonly };
        },
    });

    function createWrapper(provide: any = {}) {
        return mount(TestInputComponent, {
            global: {
                provide,
            },
        });
    }

    let formProvide: VsFormProvide;
    let wrapper: ReturnType<typeof createWrapper>;

    beforeEach(() => {
        label.value = 'Test label';
        valid.value = false;
        changed.value = false;
        validateSpy.mockClear();
        clearSpy.mockClear();

        formProvide = useFormProvide().getDefaultFormProvide();
        wrapper = createWrapper({ [VS_FORM]: formProvide });
    });

    afterEach(() => {
        wrapper.unmount();
    });

    describe('changedObj', () => {
        it('changedObj에 changed 값이 업데이트 된다', () => {
            // given
            const id = wrapper.vm.id;

            // then
            expect(formProvide.changedObj.value[id]).toBe(changed.value);
        });

        it('changed 값이 변경되면 changedObj도 변경된다', async () => {
            // given
            const id = wrapper.vm.id;
            const newChanged = true;

            // when
            changed.value = newChanged;
            await nextTick();

            // then
            expect(formProvide.changedObj.value[id]).toBe(newChanged);
        });
    });

    describe('validObj', () => {
        it('validObj에 valid 값이 업데이트 된다', () => {
            // given
            const id = wrapper.vm.id;

            // then
            expect(formProvide.validObj.value[id]).toBe(valid.value);
        });

        it('valid 값이 변경되면 validObj도 변경된다', async () => {
            // given
            const id = wrapper.vm.id;
            const newValid = true;

            // when
            valid.value = newValid;
            await nextTick();

            // then
            expect(formProvide.validObj.value[id]).toBe(newValid);
        });
    });

    describe('validateFlag', () => {
        it('validateFlag가 바뀌면 validate가 호출된다', async () => {
            // when
            formProvide.validateFlag.value = true;
            await nextTick();

            // then
            expect(validateSpy).toBeCalledTimes(1);
        });
    });

    describe('clearFlag', () => {
        it('clearFlag가 바뀌면 clear가 호출된다', async () => {
            // when
            formProvide.clearFlag.value = true;
            await nextTick();

            // then
            expect(clearSpy).toBeCalledTimes(1);
        });

        it('clearFlag가 바뀌면 changed가 false로 변경된다', async () => {
            // given
            const id = wrapper.vm.id;

            // when
            formProvide.clearFlag.value = true;
            await nextTick();

            // then
            expect(changed.value).toBe(false);
            expect(formProvide.changedObj.value[id]).toBe(false);
        });
    });

    describe('after unmount', () => {
        it('changedObj에서 id에 해당하는 값이 삭제된다', async () => {
            // given
            const id = wrapper.vm.id;

            // when
            wrapper.unmount();
            await nextTick();

            // then
            expect(formProvide.changedObj.value[id]).toBeUndefined();
        });

        it('validObj에서 id에 해당하는 값이 삭제된다', async () => {
            // given
            const id = wrapper.vm.id;

            // when
            wrapper.unmount();
            await nextTick();

            // then
            expect(formProvide.validObj.value[id]).toBeUndefined();
        });
    });
});
