import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { store } from '@/stores';
import VsConfirm from './../VsConfirm.vue';

describe('vs-confirm', () => {
    const text = 'This is Confirm Text';

    it('text를 렌더할 수 있다', async () => {
        // given
        const wrapper = mount(VsConfirm, {
            props: {
                modelValue: true,
                text,
            },
            global: {
                stubs: ['Teleport'],
            },
        });

        // then
        expect(wrapper.find('.vs-confirm-text').html()).toContain(text);
    });

    it('ok-button의 텍스트를 설정할 수 있다', () => {
        // given
        const okText = 'YES';
        const wrapper = mount(VsConfirm, {
            props: {
                modelValue: true,
                text,
                okText,
            },
            global: {
                stubs: ['Teleport'],
            },
        });

        // then
        expect(wrapper.find('.vs-ok-button').text()).toContain(okText);
    });

    it('cancel-button의 텍스트를 설정할 수 있다', () => {
        // given
        const cancelText = 'NO';
        const wrapper = mount(VsConfirm, {
            props: {
                modelValue: true,
                text,
                cancelText,
            },
            global: {
                stubs: ['Teleport'],
            },
        });

        // then
        expect(wrapper.find('.vs-cancel-button').text()).toContain(cancelText);
    });

    it('ok 버튼을 클릭하면 resolve 가 true 로 이행되고 confirm이 닫힌다', async () => {
        // given
        const spy = vi.spyOn(store.confirm, 'executeResolve');
        const wrapper = mount(VsConfirm, {
            props: {
                modelValue: true,
                text,
            },
            global: {
                stubs: ['Teleport'],
            },
        });

        // when
        await wrapper.find('.vs-ok-button').trigger('click');

        // then
        expect(wrapper.vm.isOpen).toBe(false);
        expect(spy).toHaveBeenCalledWith(true);
    });

    it('cancel 버튼을 클릭하면 resolve 가 false 로 이행되고 confirm이 닫힌다', async () => {
        // given
        const spy = vi.spyOn(store.confirm, 'executeResolve');
        const wrapper = mount(VsConfirm, {
            props: {
                modelValue: true,
                text,
            },
            global: {
                stubs: ['Teleport'],
            },
        });

        // when
        await wrapper.find('.vs-cancel-button').trigger('click');

        // then
        expect(wrapper.vm.isOpen).toBe(false);
        expect(spy).toHaveBeenCalledWith(false);
    });
});
