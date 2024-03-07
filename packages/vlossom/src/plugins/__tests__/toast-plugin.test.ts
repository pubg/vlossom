import { describe, beforeEach, afterEach, vi, it, expect } from 'vitest';
import { attach, toastPlugin, getToastInfo } from '../toast-plugin';
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
            attach('top', 'center');

            // then
            expect(consoleError).toBeCalledWith('body not found');
        });

        describe('body 가 있을 때', () => {
            it('placement 와 align 이 일치하는 node 가 이미 dom 에 attach 되어 있으면 추가로 attach 하지 않는다', () => {
                // given
                const placement = 'top';
                const align = 'center';

                const toastView = document.createElement('div');
                toastView.setAttribute('id', `vs-toast-view-${placement}-${align}`);
                document.body.appendChild(toastView);

                // when
                attach(placement, align);

                // then
                expect(document.querySelectorAll('#vs-toast-view-top-center').length).toBe(1);
            });

            it('placement 와 align 이 일치하는 node 가 없으면 새로운 VsToastView 컴포넌트로 VNode를 생성해서 body의 하위노드로 attach 한다', () => {
                // when
                const placement = 'bottom';
                const align = 'start';

                attach(placement, align);

                // then
                expect(document.querySelectorAll('#vs-toast-view-bottom-start').length).toBe(1);
            });
        });
    });

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

    describe('toast', () => {
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
            expect(mockStore!.toast.addToast).toHaveBeenCalled();
            expect(document.querySelectorAll('.vs-toast-view').length).toBe(1);
        });

        it('UIState 가 info 인 toast 를 보여줄 수 있다', () => {
            // given
            vi.spyOn(store.toast, 'addToast').mockImplementation(mockStore!.toast.addToast);

            // when
            toastPlugin.info('Hello');

            // then
            expect(mockStore!.toast.addToast).toHaveBeenCalled();
            expect(document.querySelectorAll('.vs-toast-view').length).toBe(1);
        });

        it('UIState 가 error 인 toast 를 보여줄 수 있다', () => {
            // given
            vi.spyOn(store.toast, 'addToast').mockImplementation(mockStore!.toast.addToast);

            // when
            toastPlugin.error('Hello');

            // then
            expect(mockStore!.toast.addToast).toHaveBeenCalled();
            expect(document.querySelectorAll('.vs-toast-view').length).toBe(1);
        });

        it('UIState 가 warning 인 toast 를 보여줄 수 있다', () => {
            // given
            vi.spyOn(store.toast, 'addToast').mockImplementation(mockStore!.toast.addToast);

            // when
            toastPlugin.warn('Hello');

            // then
            expect(mockStore!.toast.addToast).toHaveBeenCalled();
            expect(document.querySelectorAll('.vs-toast-view').length).toBe(1);
        });
    });
});
