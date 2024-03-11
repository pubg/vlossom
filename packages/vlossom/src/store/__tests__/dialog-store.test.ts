import { describe, it, expect, vi } from 'vitest';
import { DialogStore } from '../dialog-store';
import * as confirmPlugin from '@/plugins/confirm-plugin';

describe('dialog store', () => {
    describe('push', () => {
        it('dialog id를 stack에 추가할 수 있다', () => {
            // given
            const store = new DialogStore();
            const id = 'dialog1';

            // when
            store.push(id);

            // then
            expect(store.getTopId()).toEqual(id);
        });
    });

    describe('pop', () => {
        it('stack에서 가장 위에 있는 dialog id를 제거할 수 있다', () => {
            // given
            const store = new DialogStore();

            // when
            store.push('dialog1');
            store.push('dialog2');

            store.pop();

            // then
            expect(store.getTopId()).toEqual('dialog1');
        });
    });

    describe('getTopId', () => {
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
});
