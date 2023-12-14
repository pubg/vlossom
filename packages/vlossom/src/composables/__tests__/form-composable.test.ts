import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { Ref, defineComponent, nextTick, ref } from 'vue';
import { useFormComposable } from '@/composables';

describe('form-composable', () => {
    // provides
    const labelObj: Ref<Record<string, string>> = ref({});
    const changedObj: Ref<Record<string, boolean>> = ref({});
    const validObj: Ref<Record<string, boolean>> = ref({});
    const validateFlag = ref(false);
    const clearFlag = ref(false);

    // parameters
    const label = ref('Test label');
    const valid = ref(false);
    const changed = ref(false);
    const validate = vi.fn(() => true);
    const clear = vi.fn();

    const InputComponent = defineComponent({
        render: () => null,
        setup() {
            const { id } = useFormComposable(label, valid, changed, validate, clear);
            return { id };
        },
    });

    function createWrapper() {
        return mount(InputComponent, {
            global: {
                provide: {
                    labelObj,
                    changedObj,
                    validObj,
                    validateFlag,
                    clearFlag,
                },
            },
        });
    }

    let wrapper: ReturnType<typeof createWrapper>;
    beforeEach(() => {
        labelObj.value = {};
        changedObj.value = {};
        validObj.value = {};
        validateFlag.value = false;
        clearFlag.value = false;

        label.value = 'Test label';
        valid.value = false;
        changed.value = false;
        validate.mockClear();
        clear.mockClear();

        wrapper = createWrapper();
    });

    afterEach(() => {
        wrapper.unmount();
    });

    describe('labelObj', () => {
        it('labelObj에 label 값이 업데이트 된다', () => {
            // given
            const id = wrapper.vm.id;

            // then
            expect(labelObj.value[id]).toBe(label.value);
        });

        it('label 값이 변경되면 labelObj도 변경된다', async () => {
            // given
            const id = wrapper.vm.id;
            const newLabel = 'New label';

            // when
            label.value = newLabel;
            await nextTick();

            // then
            expect(labelObj.value[id]).toBe(newLabel);
        });
    });

    describe('changedObj', () => {
        it('changedObj에 changed 값이 업데이트 된다', () => {
            // given
            const id = wrapper.vm.id;

            // then
            expect(changedObj.value[id]).toBe(changed.value);
        });

        it('changed 값이 변경되면 changedObj도 변경된다', async () => {
            // given
            const id = wrapper.vm.id;
            const newChanged = true;

            // when
            changed.value = newChanged;
            await nextTick();

            // then
            expect(changedObj.value[id]).toBe(newChanged);
        });
    });

    describe('validObj', () => {
        it('validObj에 valid 값이 업데이트 된다', () => {
            // given
            const id = wrapper.vm.id;

            // then
            expect(validObj.value[id]).toBe(valid.value);
        });

        it('valid 값이 변경되면 validObj도 변경된다', async () => {
            // given
            const id = wrapper.vm.id;
            const newValid = true;

            // when
            valid.value = newValid;
            await nextTick();

            // then
            expect(validObj.value[id]).toBe(newValid);
        });
    });

    describe('validateFlag', () => {
        it('validateFlag가 바뀌면 validate가 호출된다', async () => {
            // when
            validateFlag.value = true;
            await nextTick();

            // then
            expect(validate).toBeCalledTimes(1);
        });
    });

    describe('clearFlag', () => {
        it('clearFlag가 바뀌면 clear가 호출된다', async () => {
            // when
            clearFlag.value = true;
            await nextTick();

            // then
            expect(clear).toBeCalledTimes(1);
        });

        it('clearFlag가 바뀌면 changed가 false로 변경된다', async () => {
            // given
            const id = wrapper.vm.id;

            // when
            clearFlag.value = true;
            await nextTick();

            // then
            expect(changed.value).toBe(false);
            expect(changedObj.value[id]).toBe(false);
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
            expect(labelObj.value[id]).toBeUndefined();
        });

        it('changedObj에서 id에 해당하는 값이 삭제된다', async () => {
            // given
            const id = wrapper.vm.id;

            // when
            wrapper.unmount();
            await nextTick();

            // then
            expect(changedObj.value[id]).toBeUndefined();
        });

        it('validObj에서 id에 해당하는 값이 삭제된다', async () => {
            // given
            const id = wrapper.vm.id;

            // when
            wrapper.unmount();
            await nextTick();

            // then
            expect(validObj.value[id]).toBeUndefined();
        });
    });
});
