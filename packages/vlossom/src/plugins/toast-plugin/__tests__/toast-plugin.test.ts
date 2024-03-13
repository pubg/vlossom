import { describe, beforeEach, afterEach, vi, it, expect } from 'vitest';
import { toastPlugin } from '..';
import { store } from '@/store';

import type { ToastInfo } from '@/plugins';

describe('toast-plugin', () => {
    describe('toastPlugin', () => {
        let originalAddToast: (toastInfo: ToastInfo) => void = () => {};

        beforeEach(() => {
            originalAddToast = store.toast.addToast;
            store.toast.addToast = vi.spyOn(store.toast, 'addToast').mockImplementation(() => undefined).mockClear;
        });

        afterEach(() => {
            store.toast.addToast = originalAddToast;
        });

        it('UIState 가 없는 toast 를 보여줄 수 있다', () => {
            // given
            vi.spyOn(store.toast, 'addToast').mockImplementation(() => vi.fn());

            // when
            toastPlugin.show('Hello');

            // then
            expect(store.toast.addToast).toHaveBeenCalledWith({
                id: expect.any(String),
                text: 'Hello',
                autoClose: true,
                duration: 3000,
                placement: 'top',
                align: 'center',
            });
            expect(document.querySelectorAll('.vs-toast-view').length).toBe(1);
        });

        it('UIState 가 success 인 toast 를 보여줄 수 있다', () => {
            // given
            vi.spyOn(store.toast, 'addToast').mockImplementation(() => vi.fn());

            // when
            toastPlugin.success('Hello');

            // then
            expect(store.toast.addToast).toHaveBeenCalledTimes(1);
            expect(document.querySelectorAll('.vs-toast-view').length).toBe(1);
        });

        it('UIState 가 info 인 toast 를 보여줄 수 있다', () => {
            // given
            vi.spyOn(store.toast, 'addToast').mockImplementation(() => vi.fn());

            // when
            toastPlugin.info('Hello');

            // then
            expect(store.toast.addToast).toHaveBeenCalledTimes(1);
            expect(document.querySelectorAll('.vs-toast-view').length).toBe(1);
        });

        it('UIState 가 error 인 toast 를 보여줄 수 있다', () => {
            // given
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            vi.spyOn(store.toast, 'addToast').mockImplementation(() => vi.fn());

            // when
            toastPlugin.error('Hello');

            // then
            expect(store.toast.addToast).toHaveBeenCalledTimes(1);
            expect(document.querySelectorAll('.vs-toast-view').length).toBe(1);
            expect(consoleSpy).toHaveBeenCalledTimes(1);

            // clear
            consoleSpy.mockRestore();
        });

        it('UIState 가 warning 인 toast 를 보여줄 수 있다', () => {
            // given
            const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
            vi.spyOn(store.toast, 'addToast').mockImplementation(() => vi.fn());

            // when
            toastPlugin.warn('Hello');

            // then
            expect(store.toast.addToast).toHaveBeenCalledTimes(1);
            expect(document.querySelectorAll('.vs-toast-view').length).toBe(1);
            expect(consoleSpy).toHaveBeenCalledTimes(1);

            // clear
            consoleSpy.mockRestore();
        });
    });
});
