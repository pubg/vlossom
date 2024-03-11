import { describe, beforeEach, afterEach, vi, it, expect } from 'vitest';
import { toastPlugin, getToastInfo } from '..';
import { store } from '@/store';

import type { ToastInfo } from '@/plugins';

describe('toast-plugin', () => {
    describe('getToastInfo', () => {
        it('toastInfo 를 생성할 수 있다', () => {
            // when
            const result = getToastInfo('Hello');

            // then
            expect(result).toEqual({
                id: expect.any(String),
                text: 'Hello',
                autoClose: true,
                duration: 3000,
                placement: 'top',
                align: 'center',
            });
        });
    });

    describe('toastPlugin', () => {
        let originalAddToast: (toastInfo: ToastInfo) => void = () => {};
        let mockStore: {
            toast: {
                addToast: (toastInfo: ToastInfo) => void;
            };
        } | null = null;

        beforeEach(() => {
            originalAddToast = store.toast.addToast;
            store.toast.addToast = vi.spyOn(store.toast, 'addToast').mockImplementation(() => undefined).mockClear;

            mockStore = {
                toast: {
                    addToast: vi.fn(),
                },
            };
        });

        afterEach(() => {
            store.toast.addToast = originalAddToast;
        });

        it('UIState 가 없는 toast 를 보여줄 수 있다', () => {
            // given
            vi.spyOn(store.toast, 'addToast').mockImplementation(mockStore!.toast.addToast);

            // when
            toastPlugin.show('Hello');

            // then
            expect(mockStore!.toast.addToast).toHaveBeenCalledWith({
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
            vi.spyOn(store.toast, 'addToast').mockImplementation(mockStore!.toast.addToast);

            // when
            toastPlugin.success('Hello');

            // then
            expect(mockStore!.toast.addToast).toHaveBeenCalledTimes(1);
            expect(document.querySelectorAll('.vs-toast-view').length).toBe(1);
        });

        it('UIState 가 info 인 toast 를 보여줄 수 있다', () => {
            // given
            vi.spyOn(store.toast, 'addToast').mockImplementation(mockStore!.toast.addToast);

            // when
            toastPlugin.info('Hello');

            // then
            expect(mockStore!.toast.addToast).toHaveBeenCalledTimes(1);
            expect(document.querySelectorAll('.vs-toast-view').length).toBe(1);
        });

        it('UIState 가 error 인 toast 를 보여줄 수 있다', () => {
            // given
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            vi.spyOn(store.toast, 'addToast').mockImplementation(mockStore!.toast.addToast);

            // when
            toastPlugin.error('Hello');

            // then
            expect(mockStore!.toast.addToast).toHaveBeenCalledTimes(1);
            expect(document.querySelectorAll('.vs-toast-view').length).toBe(1);
            expect(consoleSpy).toHaveBeenCalledTimes(1);

            // clear
            consoleSpy.mockRestore();
        });

        it('UIState 가 warning 인 toast 를 보여줄 수 있다', () => {
            // given
            const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
            vi.spyOn(store.toast, 'addToast').mockImplementation(mockStore!.toast.addToast);

            // when
            toastPlugin.warn('Hello');

            // then
            expect(mockStore!.toast.addToast).toHaveBeenCalledTimes(1);
            expect(document.querySelectorAll('.vs-toast-view').length).toBe(1);
            expect(consoleSpy).toHaveBeenCalledTimes(1);

            // clear
            consoleSpy.mockRestore();
        });
    });
});
