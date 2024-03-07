import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import VsDialogNode from '../VsDialogNode.vue';
import { store } from '@/store';

describe('vs-dialog-node', () => {
    describe('slot', () => {
        it('default slot을 전달하면 slot 컨텐츠가 렌더링 된다', () => {
            // given
            const wrapper = mount(VsDialogNode, {
                slots: {
                    default: 'Content',
                },
            });

            // then
            expect(wrapper.html()).toContain('Content');
        });

        it('header slot을 전달하면 header 영역에 slot 컨텐츠가 렌더링 된다', () => {
            // given
            const wrapper = mount(VsDialogNode, {
                slots: {
                    header: 'Header',
                },
            });

            // then
            expect(wrapper.find('header').exists()).toBe(true);
            expect(wrapper.find('header').text()).toBe('Header');
        });

        it('footer slot을 전달하면 footer 영역에 slot 컨텐츠가 렌더링 된다', () => {
            // given
            const wrapper = mount(VsDialogNode, {
                slots: {
                    footer: 'Footer',
                },
            });

            // then
            expect(wrapper.find('footer').exists()).toBe(true);
            expect(wrapper.find('footer').text()).toBe('Footer');
        });
    });

    describe('aria attributes', () => {
        it('header slot이 있는 경우 dialog의 aria-lablledby 속성 값이 <header>의 id 가 된다', () => {
            // given
            const wrapper = mount(VsDialogNode, {
                slots: {
                    header: 'Header',
                },
            });

            // then
            const dialog = wrapper.find('[role="dialog"]');
            expect(dialog.attributes('aria-labelledby')).toBe(wrapper.find('header').attributes('id'));
            expect(dialog.attributes('aria-label')).toBe(undefined);
        });

        it('header slot이 없는 경우 dialog의 aria-lablledby 속성이 없고 대신 aria-label 속성 값이 Dialog가 된다', () => {
            // given
            const wrapper = mount(VsDialogNode);

            // then
            const dialog = wrapper.find('[role="dialog"]');
            expect(dialog.attributes('aria-labelledby')).toBe(undefined);
            expect(dialog.attributes('aria-label')).toBe('Dialog');
        });

        it('dialog body 요소의 id 값이 dialog의 aria-describedby 속성 값이 된다', () => {
            // given
            const wrapper = mount(VsDialogNode, {
                slots: {
                    default: 'Content',
                },
            });

            // then
            const dialog = wrapper.find('[role="dialog"]');
            expect(dialog.attributes('aria-describedby')).toBe(wrapper.find('div.dialog-body').attributes('id'));
        });

        it('isModal prop 값이 dialog의 aria-modal 속성 값에 바인딩 된다', async () => {
            // given
            const wrapper = mount(VsDialogNode, { modal: true });

            // then
            const dialog = wrapper.find('[role="dialog"]');
            expect(dialog.attributes('aria-modal')).toBe('true');

            // when
            await wrapper.setProps({ isModal: false });
            // then
            expect(dialog.attributes('aria-modal')).toBe('false');
        });
    });

    describe('dialog store', () => {
        it('mount 되면 dialog store에 dialog id를 push 한다', () => {
            // given
            const spy = vi.spyOn(store.dialog, 'push');
            const wrapper = mount(VsDialogNode);

            // then
            expect(spy).toHaveBeenCalledWith(wrapper.vm.id);
        });

        it('unmount 되면 dialog store에서 dialog id를 pop 한다', () => {
            // given
            const spy = vi.spyOn(store.dialog, 'pop');
            const wrapper = mount(VsDialogNode);

            // when
            wrapper.unmount();

            // then
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('close event', () => {
        it('Escape 키를 눌렀을 때 가장 위에 있는 dialog 이어야 close 이벤트를 emit한다', () => {
            // given
            const wrapper1 = mount(VsDialogNode, {
                attachTo: document.body,
            });
            const wrapper2 = mount(VsDialogNode, {
                attachTo: document.body,
            });

            // when
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

            // then
            expect(wrapper1.emitted('close')).toBeFalsy();
            expect(wrapper2.emitted('close')).toBeTruthy();
        });

        it('close-on-esc prop을 false로 전달하면 Escape 키를 눌러도 close 이벤트를 emit 하지 않는다', () => {
            // given
            const wrapper = mount(VsDialogNode, {
                props: {
                    closeOnEsc: false,
                },
                attachTo: document.body,
            });

            // when
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

            // then
            expect(wrapper.emitted('close')).toBeFalsy();
        });
    });
});
