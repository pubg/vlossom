import { describe, expect, it, vi } from 'vitest';
import { ToastStore } from './../toast-store';
import type { Align, Placement } from '@/declaration';
import { ToastInfo } from '@/plugins';

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
            const toast: ToastInfo = {
                id: '1',
                content: 'Hello',
                autoClose: false,
                placement: 'top' as Exclude<Placement, 'left' | 'right'>,
                align: 'center' as Align,
            };

            // when
            store.addToast(toast);

            // then
            expect(store.getState().toasts).toEqual([toast]);
        });

        it('autoClose 를 true로 설정하면, toast를 추가한 후 timeout 만큼 시간이 지나면 toast를 제거한다', () => {
            // given
            const timeout = 1000;

            const store = new ToastStore();
            const toast: ToastInfo = {
                id: '1',
                content: 'Hello',
                autoClose: true,
                timeout,
                placement: 'top' as Exclude<Placement, 'left' | 'right'>,
                align: 'center' as Align,
            };

            // when
            vi.useFakeTimers();
            store.addToast(toast);

            // then
            expect(store.getState().toasts).toEqual([toast]);

            // when
            vi.advanceTimersByTime(timeout);

            // then
            expect(store.getState().toasts).toEqual([]);
        });

        it('autoClose 를 false 로 설정하면, toast를 추가한 후 timeout 만큼 시간이 지나도 toast가 제거되지 않는다', () => {
            // given
            const timeout = 1000;

            const store = new ToastStore();
            const toast: ToastInfo = {
                id: '1',
                content: 'Hello',
                autoClose: false,
                timeout,
                placement: 'top' as Exclude<Placement, 'left' | 'right'>,
                align: 'center' as Align,
            };

            // when
            vi.useFakeTimers();
            store.addToast(toast);

            // then
            expect(store.getState().toasts).toEqual([toast]);

            // when
            vi.advanceTimersByTime(timeout);

            // then
            expect(store.getState().toasts).toEqual([toast]);
        });
    });
    describe('removeToastById', () => {
        it('특정 id의 toast를 제거할 수 있다', () => {
            // given
            const store = new ToastStore();
            const toast: ToastInfo = {
                id: '1',
                content: 'Hello',
                autoClose: false,
                placement: 'top' as Exclude<Placement, 'left' | 'right'>,
                align: 'center' as Align,
            };
            store.addToast(toast);

            // then
            expect(store.getState().toasts).toEqual([toast]);

            // when
            store.removeToastById('1');

            // then
            expect(store.getState().toasts).toEqual([]);
        });
    });

    describe('clearAll', () => {
        it('모든 toast를 제거할 수 있다', () => {
            // given
            const store = new ToastStore();
            const toast1: ToastInfo = {
                id: '1',
                content: 'Hello',
                autoClose: false,
                placement: 'top' as Exclude<Placement, 'left' | 'right'>,
                align: 'center' as Align,
            };
            const toast2 = {
                id: '2',
                content: 'Hello',
                autoClose: false,
                placement: 'bottom' as Exclude<Placement, 'left' | 'right'>,
                align: 'end' as Align,
            };

            // when
            store.addToast(toast1);
            store.addToast(toast2);

            // then
            expect(store.getState().toasts).toEqual([toast2, toast1]);

            // when
            store.clearAll();

            // then
            expect(store.getState().toasts).toEqual([]);
        });
    });
});
