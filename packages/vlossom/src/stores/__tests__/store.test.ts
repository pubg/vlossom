import { describe, it, expect } from 'vitest';
import { VsStore } from './../index';
import { ConfirmStore } from './../confirm-store';
import { OptionStore } from './../option-store';
import { ToastStore } from './../toast-store';
import { ModalStore } from '../modal-store';

describe('Vlossom store', () => {
    it('store가 다른 store를 생성해서 가지고 있다', () => {
        // given
        const store = new VsStore();

        // then
        expect(Object.keys(store).length).toBe(4);
        expect(store.confirm).toBeInstanceOf(ConfirmStore);
        expect(store.modal).toBeInstanceOf(ModalStore);
        expect(store.option).toBeInstanceOf(OptionStore);
        expect(store.toast).toBeInstanceOf(ToastStore);
    });
});
