import { describe, afterEach, vi, it, expect } from 'vitest';
import { store } from '@/store';
import * as confirmPlugin from '@/plugins/confirm-plugin';

const { attachConfirm, detachConfirm, confirmPlugin: confirm } = confirmPlugin;

describe('confirm-plugin', () => {
    describe('attachConfirm', () => {
        const originalDocumentBody = document.body;

        afterEach(() => {
            Object.defineProperty(document, 'body', {
                value: originalDocumentBody,
            });

            const target = document.getElementById('vs-confirm');
            if (target) {
                document.body.removeChild(target);
            }
        });

        it('body 가 없으면 콘솔 에러를 띄우고 즉시 리턴한다', () => {
            // given
            const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);

            Object.defineProperty(document, 'body', {
                value: undefined,
                writable: true,
            });

            // when
            attachConfirm({ text: 'Are you sure?' });

            // then
            expect(consoleError).toBeCalledWith('body not found');
        });

        describe('body 가 있을 때', () => {
            it('vs-confirm 이 이미 dom 에 attach 되어 있으면 추가로 attach 하지 않는다', () => {
                // given
                const confirmComp = document.createElement('div');
                confirmComp.setAttribute('id', 'vs-confirm');
                document.body.appendChild(confirmComp);

                // when
                attachConfirm({ text: 'Are you sure?' });

                // then
                expect(document.querySelectorAll('#vs-confirm').length).toBe(1);
            });

            it('vs-confirm 이 없으면 새로운 VsConfirm 컴포넌트로 VNode를 생성해서 body의 하위노드로 attach 한다', () => {
                // when
                attachConfirm({ text: 'Are you sure?' });

                // then
                expect(document.querySelectorAll('#vs-confirm').length).toBe(1);
            });
        });
    });

    describe('detachConfirm', () => {
        it('vs-confirm 이 dom 에 attach 되어 있으면 detach 한다', () => {
            // given
            const confirmComp = document.createElement('div');
            confirmComp.setAttribute('id', 'vs-confirm');
            document.body.appendChild(confirmComp);

            // // when
            detachConfirm();

            // then
            expect(document.querySelectorAll('#vs-confirm').length).toBe(0);
        });
    });

    describe('confirmPlugin', () => {
        it('open 메서드가 Promise.resolve(true)를 리턴할 수 있다', async () => {
            // given
            const confirmInfo = { text: 'Are you sure?' };
            store.confirm.setResolve(vi.fn());
            const openPromise = confirm.open(confirmInfo.text);

            // when
            store.confirm.executeResolve(true);

            // then
            expect(await openPromise).toBe(true);
        });

        it('open 메서드가 Promise.resolve(false)를 리턴할 수 있다', async () => {
            // given
            const confirmInfo = { text: 'Are you sure?' };
            store.confirm.setResolve(vi.fn());

            // when
            const openPromise = confirm.open(confirmInfo.text);
            store.confirm.executeResolve(false);

            // then
            expect(await openPromise).toBe(false);
        });

        it('prompt 메서드로 윈도우 프롬프트 입력값과 confirmText 를 비교할 수 있다', async () => {
            // given
            const confirmText = 'YES';
            const promptText = 'YES';
            const promptSpy = vi.spyOn(window, 'prompt').mockReturnValue(promptText);

            // when
            const promptPromise = confirm.prompt('type "ABC"', confirmText);

            // then
            expect(promptSpy).toBeCalledWith('type "ABC"');
            expect(await promptPromise).toBe(true);
        });
    });
});
