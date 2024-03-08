import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { store } from '@/store';
import VsConfirm from '../VsConfirm.vue';

describe('vs-confirm', () => {
    let originalResolve: (result: boolean) => void = () => {};
    let originalPop: () => void = () => {};

    let mockStore: {
        confirm: {
            executeResolve: (result: boolean) => void;
        };
        dialog: {
            pop: () => void;
        };
    } | null = null;

    beforeEach(() => {
        originalResolve = store.confirm.executeResolve;
        originalPop = store.dialog.pop;

        store.confirm.executeResolve = vi
            .spyOn(store.confirm, 'executeResolve')
            .mockImplementation(() => undefined).mockClear;

        store.dialog.pop = vi.spyOn(store.dialog, 'pop').mockImplementation(() => undefined).mockClear;

        mockStore = {
            confirm: {
                executeResolve: vi.fn(),
            },
            dialog: {
                pop: vi.fn(),
            },
        };
    });

    afterEach(() => {
        store.confirm.executeResolve = originalResolve;
        store.dialog.pop = originalPop;
    });

    it('text를 렌더할 수 있다', () => {
        // given
        const wrapper = mount(VsConfirm, {
            props: {
                confirmInfo: {
                    text: 'This is Confirm Text',
                },
            },
        });

        // then
        expect(wrapper.html()).toContain('This is Confirm Text');
    });

    it('okText를 설정할 수 있다', () => {
        // given
        const wrapper = mount(VsConfirm, {
            props: {
                confirmInfo: {
                    text: 'This is Confirm Text',
                    okText: 'YES',
                },
            },
        });

        // then
        expect(wrapper.html()).toContain('YES');
    });

    it('cancelText를 설정할 수 있다', () => {
        // given
        const wrapper = mount(VsConfirm, {
            props: {
                confirmInfo: {
                    text: 'This is Confirm Text',
                    cancelText: 'NO',
                },
            },
        });

        // then
        expect(wrapper.html()).toContain('NO');
    });

    it('confirm 버튼을 클릭하면 resolve 가 true 로 이행되고 confirm dialog가 닫힌다', async () => {
        // given
        vi.spyOn(store.confirm, 'executeResolve').mockImplementation(mockStore!.confirm.executeResolve);
        vi.spyOn(store.dialog, 'pop').mockImplementation(mockStore!.dialog.pop);

        const wrapper = mount(VsConfirm, {
            props: {
                confirmInfo: {
                    text: 'This is Confirm Text',
                },
            },
        });

        // when
        await wrapper.find('button[aria-label="ok"]').trigger('click');

        // then
        expect(wrapper.vm.isOpen).toBe(false);
        expect(mockStore!.confirm.executeResolve).toHaveBeenCalledTimes(1);
        expect(mockStore!.dialog.pop).toHaveBeenCalledTimes(1);
    });

    it('cancel 버튼을 클릭하면 resolve 가 false 로 이행되고 confirm dialog가 닫힌다', async () => {
        // given
        vi.spyOn(store.confirm, 'executeResolve').mockImplementation(mockStore!.confirm.executeResolve);
        vi.spyOn(store.dialog, 'pop').mockImplementation(mockStore!.dialog.pop);

        const wrapper = mount(VsConfirm, {
            props: {
                confirmInfo: {
                    text: 'This is Confirm Text',
                },
            },
        });

        // when
        await wrapper.find('button[aria-label="cancel"]').trigger('click');

        // then
        expect(wrapper.vm.isOpen).toBe(false);
        expect(mockStore!.confirm.executeResolve).toHaveBeenCalledTimes(1);
        expect(mockStore!.dialog.pop).toHaveBeenCalledTimes(1);
    });
});
