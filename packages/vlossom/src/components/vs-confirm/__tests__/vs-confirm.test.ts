import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { store } from '@/stores';
import VsConfirm from '../VsConfirm.vue';

describe('vs-confirm', () => {
    let originalResolve: (result: boolean) => void = () => {};
    let originalPop: () => void = () => {};

    beforeEach(() => {
        originalResolve = store.confirm.executeResolve;
        originalPop = store.dialog.pop;

        store.confirm.executeResolve = vi
            .spyOn(store.confirm, 'executeResolve')
            .mockImplementation(() => undefined).mockClear;

        store.dialog.pop = vi.spyOn(store.dialog, 'pop').mockImplementation(() => undefined).mockClear;
    });

    afterEach(() => {
        store.confirm.executeResolve = originalResolve;
        store.dialog.pop = originalPop;
    });

    it('text를 렌더할 수 있다', async () => {
        // given
        const text = 'This is Confirm Text';

        mount(VsConfirm, {
            props: {
                confirmInfo: {
                    text: 'This is Confirm Text',
                },
            },
        });

        // then
        expect(document.body.innerHTML).toContain(text);
    });

    it('ok-button의 텍스트를 설정할 수 있다', () => {
        // given
        const okText = 'YES';
        mount(VsConfirm, {
            props: {
                confirmInfo: {
                    text: 'This is Confirm Text',
                    okText,
                },
            },
        });

        // then
        const okButtons = document.querySelectorAll('button.ok-button');
        const targetButton = okButtons[okButtons.length - 1];
        expect(targetButton?.textContent).toContain(okText);
    });

    it('cancel-button의 텍스트를 설정할 수 있다', () => {
        // given
        const cancelText = 'NO';

        mount(VsConfirm, {
            props: {
                confirmInfo: {
                    text: 'This is Confirm Text',
                    cancelText,
                },
            },
        });

        // then
        const cancelButtons = document.querySelectorAll('button.cancel-button');
        const targetButton = cancelButtons[cancelButtons.length - 1];
        expect(targetButton?.textContent).toContain(cancelText);
    });

    it('ok 버튼을 클릭하면 resolve 가 true 로 이행되고 confirm dialog가 닫힌다', async () => {
        // given
        vi.spyOn(store.confirm, 'executeResolve').mockImplementation(() => vi.fn());
        vi.spyOn(store.dialog, 'pop').mockImplementation(() => vi.fn());

        const wrapper = mount(VsConfirm, {
            props: {
                confirmInfo: {
                    text: 'This is Confirm Text',
                },
            },
        });

        // when
        const okButtons = document.querySelectorAll('button.ok-button');
        const targetButton = okButtons[okButtons.length - 1];
        targetButton.dispatchEvent(new Event('click'));

        await nextTick();

        // then
        expect(wrapper.vm.isOpen).toBe(false);
        expect(store.confirm.executeResolve).toHaveBeenCalledTimes(1);
        expect(store.dialog.pop).toHaveBeenCalledTimes(1);
    });

    it('cancel 버튼을 클릭하면 resolve 가 false 로 이행되고 confirm dialog가 닫힌다', async () => {
        // given
        vi.spyOn(store.confirm, 'executeResolve').mockImplementation(() => vi.fn());
        vi.spyOn(store.dialog, 'pop').mockImplementation(() => vi.fn());

        const wrapper = mount(VsConfirm, {
            props: {
                confirmInfo: {
                    text: 'This is Confirm Text',
                },
            },
        });

        // when
        const cancelButtons = document.querySelectorAll('button.cancel-button');
        const targetButton = cancelButtons[cancelButtons.length - 1];
        targetButton.dispatchEvent(new Event('click'));

        await nextTick();

        // then
        expect(wrapper.vm.isOpen).toBe(false);
        expect(store.confirm.executeResolve).toHaveBeenCalledTimes(1);
        expect(store.dialog.pop).toHaveBeenCalledTimes(1);
    });
});
