import { describe, it, expect } from 'vitest';
import { VsStore } from './../index';
import { ModalStore } from './../modal-store';
import { OptionStore } from './../option-store';
import { OverlayStore } from './../overlay-store';
import { OverlayStackStore } from './../overlay-stack-store';

describe('Vlossom store', () => {
    it('store가 다른 store를 생성해서 가지고 있다', () => {
        // given
        const store = new VsStore();

        // then
        expect(Object.keys(store).length).toBe(4);
        expect(store.modal).toBeInstanceOf(ModalStore);
        expect(store.option).toBeInstanceOf(OptionStore);
        expect(store.overlay).toBeInstanceOf(OverlayStore);
        expect(store.toast).toBeInstanceOf(OverlayStackStore);
    });
});
