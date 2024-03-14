import { describe, it, expect } from 'vitest';
import { DialogStore } from '../dialog-store';

describe('dialog store', () => {
    it('stack에서 가장 위에 있는 dialog id를 가져올 수 있다', () => {
        // given
        const store = new DialogStore();
        store.push('dialog1');
        store.push('dialog2');

        // when
        const result = store.getTopId();
        // then
        expect(result).toEqual('dialog2');

        // when
        store.pop();
        // then
        expect(store.getTopId()).toEqual('dialog1');
    });
});
