import { describe, expect, it, vi } from 'vitest';
import { ToastStore } from '../toast-store';

describe('toast store', () => {
    it('toast store의 상태를 가져올 수 있다', () => {
        // given
        const store = new ToastStore();

        // when
        const result = store.getState();

        // then
        expect(result).toEqual({
            toasts: [],
        });
    });

    describe('addToast', () => {
        it('toast를 추가할 수 있다', () => {
            // given
            const store = new ToastStore();
            const toast = {
                id: '1',
                text: 'Hello',
            };

            // when
            store.addToast(toast);

            // then
            expect(store.getState().toasts).toEqual([toast]);
        });

        it('autoClose 를 true로 설정하면, toast를 추가한 후 duration 만큼 시간이 지나면 toast를 제거한다', () => {
            // given
            const duration = 1000;

            const store = new ToastStore();
            const toast = {
                id: '1',
                text: 'Hello',
                autoClose: true,
                duration,
            };

            // when
            vi.useFakeTimers();
            store.addToast(toast);

            // then
            expect(store.getState().toasts).toEqual([toast]);

            // when
            vi.advanceTimersByTime(duration);

            // then
            expect(store.getState().toasts).toEqual([]);
        });

        it('autoClose 를 false 로 설정하면, toast를 추가한 후 duration 만큼 시간이 지나도 toast가 제거되지 않는다', () => {
            // given
            const duration = 1000;

            const store = new ToastStore();
            const toast = {
                id: '1',
                text: 'Hello',
                autoClose: false,
                duration,
            };

            // when
            vi.useFakeTimers();
            store.addToast(toast);

            // then
            expect(store.getState().toasts).toEqual([toast]);

            // when
            vi.advanceTimersByTime(duration);

            // then
            expect(store.getState().toasts).toEqual([toast]);
        });
    });
    describe('removeToast', () => {
        it('특정 id의 toast를 제거할 수 있다', () => {
            // given
            const store = new ToastStore();
            const toast = {
                id: '1',
                text: 'Hello',
                autoClose: false,
            };
            store.addToast(toast);

            // then
            expect(store.getState().toasts).toEqual([toast]);

            // when
            store.removeToast('1');

            // then
            expect(store.getState().toasts).toEqual([]);
        });
    });
});
