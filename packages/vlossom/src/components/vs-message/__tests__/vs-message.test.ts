import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { UIState } from '@/declaration';
import VsMessage from './../VsMessage.vue';

function mountComponent() {
    return mount(VsMessage);
}

describe('vs-message', () => {
    it('Idle 상태의 메시지는 vs-default class와 message icon을 가진다', async () => {
        // given
        const wrapper: ReturnType<typeof mountComponent> = mount(VsMessage, {
            props: {
                message: { state: UIState.Idle, text: 'message text' },
            },
        });

        // then
        expect(wrapper.vm.colorClass).toBe('vs-default');
        expect(wrapper.vm.icon).toBe('message');
        expect(wrapper.find('.message-text').text()).toBe('message text');
    });

    it('Info 상태의 메시지는 vs-blue class와 info icon을 가진다', async () => {
        // given
        const wrapper: ReturnType<typeof mountComponent> = mount(VsMessage, {
            props: {
                message: { state: UIState.Info, text: 'message text' },
            },
        });

        // then
        expect(wrapper.vm.colorClass).toBe('vs-blue');
        expect(wrapper.vm.icon).toBe('info');
        expect(wrapper.find('.message-text').text()).toBe('message text');
    });

    it('Success 상태의 메시지는 vs-green class와 success icon을 가진다', async () => {
        // given
        const wrapper: ReturnType<typeof mountComponent> = mount(VsMessage, {
            props: {
                message: { state: UIState.Success, text: 'message text' },
            },
        });

        // then
        expect(wrapper.vm.colorClass).toBe('vs-green');
        expect(wrapper.vm.icon).toBe('success');
        expect(wrapper.find('.message-text').text()).toBe('message text');
    });

    it('Warning 상태의 메시지는 vs-yellow class와 warning icon을 가진다', async () => {
        // given
        const wrapper: ReturnType<typeof mountComponent> = mount(VsMessage, {
            props: {
                message: { state: UIState.Warning, text: 'message text' },
            },
        });

        // then
        expect(wrapper.vm.colorClass).toBe('vs-yellow');
        expect(wrapper.vm.icon).toBe('warning');
        expect(wrapper.find('.message-text').text()).toBe('message text');
    });

    it('Error 상태의 메시지는 vs-red class와 error icon을 가진다', async () => {
        // given
        const wrapper: ReturnType<typeof mountComponent> = mount(VsMessage, {
            props: {
                message: { state: UIState.Error, text: 'message text' },
            },
        });

        // then
        expect(wrapper.vm.colorClass).toBe('vs-red');
        expect(wrapper.vm.icon).toBe('error');
        expect(wrapper.find('.message-text').text()).toBe('message text');
    });
});
