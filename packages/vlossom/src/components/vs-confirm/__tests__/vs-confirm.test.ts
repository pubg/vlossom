import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { store } from '@/stores';
import VsConfirm from './../VsConfirm.vue';

describe('vs-confirm', () => {
    let originalResolve: (result: boolean) => void = () => {};
    let originalPop: () => void = () => {};

    beforeEach(() => {
        originalResolve = store.confirm.executeResolve;
        originalPop = store.escStack.pop;

        store.confirm.executeResolve = vi.fn();
        store.escStack.pop = vi.fn();
    });

    afterEach(() => {
        store.confirm.executeResolve = originalResolve;
        store.escStack.pop = originalPop;
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
        expect(store.escStack.pop).toHaveBeenCalledTimes(1);
    });

    it('cancel 버튼을 클릭하면 resolve 가 false 로 이행되고 confirm dialog가 닫힌다', async () => {
        // given
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
        expect(store.escStack.pop).toHaveBeenCalledTimes(1);
    });

    it('close-on-esc 옵션을 전달하지 않으면 기본으로 true로 설정되며, esc key를 눌렀을 때 confirm dialog가 닫힌다', async () => {
        // given
        const wrapper = mount(VsConfirm, {
            props: {
                confirmInfo: {
                    text: 'This is Confirm Text',
                },
            },
        });

        // when
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        await nextTick();

        // then
        expect(wrapper.vm.isOpen).toBe(false);
        expect(store.escStack.pop).toHaveBeenCalledTimes(1);
    });

    it('close-on-esc 옵션을 false로 전달하면 esc key를 눌러도 confirm dialog가 닫히지 않는다', async () => {
        // given
        const wrapper = mount(VsConfirm, {
            props: {
                confirmInfo: {
                    text: 'This is Confirm Text',
                    closeOnEsc: false,
                },
            },
        });

        // when
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        await nextTick();

        // then
        expect(wrapper.vm.isOpen).toBe(true);
        expect(store.escStack.pop).not.toHaveBeenCalled();
    });
});
