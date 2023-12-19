import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, nextTick, ref } from 'vue';
import { useFormProvide, useInputForm } from '@/composables';
import type { VsFormProvide } from '@/declaration/types';

describe('form-composable', () => {
    // parameters
    const label = ref('Test label');
    const valid = ref(false);
    const changed = ref(false);
    const validateSpy = vi.fn(() => true);
    const clearSpy = vi.fn();

    const InputComponent = defineComponent({
        render: () => null,
        setup() {
            const { id } = useInputForm(label, valid, changed, validateSpy, clearSpy);
            return { id };
        },
    });

    function createWrapper(provide: any = {}) {
        return mount(InputComponent, {
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

        formProvide = useFormProvide().getFormProvide();
        wrapper = createWrapper({ 'vs-form': formProvide });
    });

    afterEach(() => {
        wrapper.unmount();
    });

    describe('labelObj', () => {
        it('labelObj에 label 값이 업데이트 된다', () => {
            // given
            const id = wrapper.vm.id;

            // then
            expect(formProvide.labelObj.value[id]).toBe(label.value);
        });

        it('빈 라벨이라도 labelObj에 업데이트 된다', async () => {
            // given
            const id = wrapper.vm.id;

            // when
            label.value = '';
            await nextTick();

            // then
            expect(formProvide.labelObj.value[id]).toBe(label.value);
        });

        it('label 값이 변경되면 labelObj도 변경된다', async () => {
            // given
            const id = wrapper.vm.id;
            const newLabel = 'New label';

            // when
            label.value = newLabel;
            await nextTick();

            // then
            expect(formProvide.labelObj.value[id]).toBe(newLabel);
        });
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
        it('labelObj에서 id에 해당하는 값이 삭제된다', async () => {
            // given
            const id = wrapper.vm.id;

            // when
            wrapper.unmount();
            await nextTick();

            // then
            expect(formProvide.labelObj.value[id]).toBeUndefined();
        });

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
