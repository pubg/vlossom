import { describe, expect, it, vi } from 'vitest';
import { ConfirmStore } from '../confirm-store';

describe('confirm store', () => {
    it('confirm store의 상태를 가져올 수 있다', () => {
        // given
        const store = new ConfirmStore();

        // when
        const result = store.getState();

        // then
        expect(result).toEqual({
            resolve: null,
        });
    });

    describe('setResolve', () => {
        it('resolve를 설정할 수 있다', () => {
            // given
            const store = new ConfirmStore();
            const resolve = vi.fn();

            // when
            store.setResolve(resolve);

            // then
            expect(store.getState().resolve).not.toBeNull();
        });
    });

    describe('executeResolve', () => {
        it('resolve를 이행할 수 있다', async () => {
            // given
            const store = new ConfirmStore();
            const resolve = vi.fn();
            store.setResolve(resolve);

            // when
            store.executeResolve(true);

            // then
            expect(resolve).toBeCalledWith(true);
        });
    });
});
