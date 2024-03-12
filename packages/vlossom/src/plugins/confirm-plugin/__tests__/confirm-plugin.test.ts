import { describe, vi, it, expect } from 'vitest';
import { store } from '@/store';
import * as confirmPlugin from '@/plugins/confirm-plugin';

const { confirmPlugin: confirm } = confirmPlugin;

describe('confirm-plugin', () => {
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
