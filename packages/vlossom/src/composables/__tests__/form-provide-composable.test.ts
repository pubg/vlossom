import { describe, expect, it } from 'vitest';
import { useFormProvide } from '@/composables';

describe('form-provide-composable', () => {
    it('labelObj에 label 값이 업데이트 된다', () => {
        // given
        const { labelObj, updateLabel } = useFormProvide();
        const id = 'test';
        const label = 'Test label';

        // when
        updateLabel(id, label);

        // then
        expect(labelObj.value[id]).toBe(label);
    });

    it('changedObj에 changed 값이 업데이트 된다', () => {
        // given
        const { changedObj, updateChanged } = useFormProvide();
        const id = 'test';
        const changed = true;

        // when
        updateChanged(id, changed);

        // then
        expect(changedObj.value[id]).toBe(changed);
    });

    it('validObj에 valid 값이 업데이트 된다', () => {
        // given
        const { validObj, updateValid } = useFormProvide();
        const id = 'test';
        const valid = true;

        // when
        updateValid(id, valid);

        // then
        expect(validObj.value[id]).toBe(valid);
    });

    it('form에서 제거된다', () => {
        // given
        const { labelObj, changedObj, validObj, removeFromForm } = useFormProvide();
        const id = 'test';
        labelObj.value[id] = 'test';
        changedObj.value[id] = true;
        validObj.value[id] = true;

        // when
        removeFromForm(id);

        // then
        expect(labelObj.value[id]).toBeUndefined();
        expect(changedObj.value[id]).toBeUndefined();
        expect(validObj.value[id]).toBeUndefined();
    });
});
