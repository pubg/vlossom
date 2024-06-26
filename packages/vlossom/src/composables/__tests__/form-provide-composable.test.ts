import { describe, expect, it } from 'vitest';
import { useFormProvide } from '@/composables';

describe('form-provide-composable', () => {
    it('disabled 값을 업데이트 할 수 있다', () => {
        // given
        const { disabled, setDisabled } = useFormProvide();

        // when
        setDisabled(true);

        // then
        expect(disabled.value).toBe(true);
    });

    it('readonly 값을 업데이트 할 수 있다', () => {
        // given
        const { readonly, setReadonly } = useFormProvide();

        // when
        setReadonly(true);

        // then
        expect(readonly.value).toBe(true);
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
        const { changedObj, validObj, removeFromForm } = useFormProvide();
        const id = 'test';
        changedObj.value[id] = true;
        validObj.value[id] = true;

        // when
        removeFromForm(id);

        // then
        expect(changedObj.value[id]).toBeUndefined();
        expect(validObj.value[id]).toBeUndefined();
    });
});
