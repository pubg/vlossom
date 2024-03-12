import { describe, it, expect } from 'vitest';
import { VsStore } from './../index';
import { OptionStore } from './../option-store';
import { DialogStore } from '../dialog-store';
import { ToastStore } from './../toast-store';
import { ConfirmStore } from './../confirm-store';

describe('Vlossom store', () => {
    it('store가 다른 store를 생성해서 가지고 있다', () => {
        // given
        const store = new VsStore();

        // then
        expect(Object.keys(store).length).toBe(4);
        expect(store.option).toBeInstanceOf(OptionStore);
        expect(store.dialog).toBeInstanceOf(DialogStore);
        expect(store.toast).toBeInstanceOf(ToastStore);
        expect(store.confirm).toBeInstanceOf(ConfirmStore);
    });
});
