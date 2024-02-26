import { describe, it, expect } from 'vitest';
import { VsStore } from './../index';
import { OptionStore } from './../option-store';

describe('Vlossom store', () => {
    it('store가 다른 store를 생성해서 가지고 있다', () => {
        // given
        const store = new VsStore();

        // then
        expect(Object.keys(store).length).toBe(1);
        expect(store.option).toBeInstanceOf(OptionStore);
    });
});
