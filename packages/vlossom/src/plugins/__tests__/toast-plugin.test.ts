import { describe, beforeEach, afterEach, vi, it, expect } from 'vitest';
import { attach, toast, toastBody } from '../toast-plugin';
import { store } from '@/store';
import { ToastInfo } from '@/declaration';

describe('toast-plugin', () => {
    describe('attach', () => {
        const originalDocumentBody = document.body;

        afterEach(() => {
            Object.defineProperty(document, 'body', {
                value: originalDocumentBody,
            });
        });

        it('body 가 없으면 콘솔 에러를 띄우고 즉시 리턴한다', () => {
            // given
            const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);

            Object.defineProperty(document, 'body', {
                value: undefined,
                writable: true,
            });

            // when
            attach();

            // then
            expect(consoleError).toBeCalledWith('body not found');
        });

        describe('body 가 있을 때', () => {
            it('vs-toast-view 가 이미 있으면 즉시 리턴한다', () => {
                // given
                const toastView = document.createElement('div');
                toastView.className = 'vs-toast-view';
                document.body.appendChild(toastView);

                // when
                attach();

                // then
                expect(document.querySelectorAll('.vs-toast-view').length).toBe(1);
            });

            it('vs-toast-view 가 없으면 새로운 VsToastView 컴포넌트로 VNode를 생성해서 body의 하위노드로 렌더한다', () => {
                // when
                attach();

                // then
                expect(document.querySelectorAll('.vs-toast-view').length).toBe(1);
            });
        });
    });

    describe('toastBody', () => {
        it('toastBody 를 생성할 수 있다', () => {
            // when
            const result = toastBody('Hello');

            // then
            expect(result).toEqual({
                id: expect.any(String),
                state: undefined,
                text: 'Hello',
                autoClose: true,
                duration: 3000,
                placement: 'top',
                align: 'center',
                colorScheme: undefined,
            });
        });
    });

    describe('toast', () => {
        let originalAddToast: (toastInfo: ToastInfo) => void = () => {};
        let mockStore: {
            toasts: ToastInfo[];
            toast: {
                addToast: (toastInfo: ToastInfo) => void;
            };
        } | null = null;

        beforeEach(() => {
            originalAddToast = store.toast.addToast;
            store.toast.addToast = vi.spyOn(store.toast, 'addToast').mockImplementation(() => undefined).mockClear;

            mockStore = {
                toasts: [],
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
            toast.show('Hello');

            // then
            expect(mockStore!.toast.addToast).toHaveBeenCalled();
            expect(document.querySelectorAll('.vs-toast-view').length).toBe(1);
        });

        it('UIState 가 success 인 toast 를 보여줄 수 있다', () => {
            // given
            vi.spyOn(store.toast, 'addToast').mockImplementation(mockStore!.toast.addToast);

            // when
            toast.success('Hello');

            // then
            expect(mockStore!.toast.addToast).toHaveBeenCalled();
            expect(document.querySelectorAll('.vs-toast-view').length).toBe(1);
        });

        it('UIState 가 info 인 toast 를 보여줄 수 있다', () => {
            // given
            vi.spyOn(store.toast, 'addToast').mockImplementation(mockStore!.toast.addToast);

            // when
            toast.info('Hello');

            // then
            expect(mockStore!.toast.addToast).toHaveBeenCalled();
            expect(document.querySelectorAll('.vs-toast-view').length).toBe(1);
        });

        it('UIState 가 error 인 toast 를 보여줄 수 있다', () => {
            // given
            vi.spyOn(store.toast, 'addToast').mockImplementation(mockStore!.toast.addToast);

            // when
            toast.error('Hello');

            // then
            expect(mockStore!.toast.addToast).toHaveBeenCalled();
            expect(document.querySelectorAll('.vs-toast-view').length).toBe(1);
        });

        it('UIState 가 warning 인 toast 를 보여줄 수 있다', () => {
            // given
            vi.spyOn(store.toast, 'addToast').mockImplementation(mockStore!.toast.addToast);

            // when
            toast.warn('Hello');

            // then
            expect(mockStore!.toast.addToast).toHaveBeenCalled();
            expect(document.querySelectorAll('.vs-toast-view').length).toBe(1);
        });
    });
});
