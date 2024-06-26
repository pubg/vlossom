import { describe, it, expect } from 'vitest';
import { EscStackStore } from '../esc-stack-store';

describe('esc stack store', () => {
    it('stack에서 가장 위에 있는 dialog id를 가져올 수 있다', () => {
        // given
        const store = new EscStackStore();
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
