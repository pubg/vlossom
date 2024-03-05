import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsModal from './../VsModal.vue';

describe('vs-modal', () => {
    describe('v-model', () => {
        it('modelValue가 false이면 modal이 열리지 않는다', async () => {
            // given
            const wrapper = mount(VsModal, {
                props: {
                    modelValue: false,
                },
                global: {
                    stubs: ['Teleport'],
                },
            });

            // then
            expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
        });

        it('modelValue가 true이면 modal이 열린다', async () => {
            // given
            const wrapper = mount(VsModal, {
                props: {
                    modelValue: false,
                },
                global: {
                    stubs: ['Teleport'],
                },
            });

            expect(wrapper.find('[role="dialog"]').exists()).toBe(false);

            // when
            await wrapper.setProps({ modelValue: true });

            // then
            expect(wrapper.find('[role="dialog"]').exists()).toBe(true);
        });
    });

    describe('slot', () => {
        it('default slot을 전달하면 slot 컨텐츠가 렌더링 된다', () => {
            // given
            const wrapper = mount(VsModal, {
                props: {
                    modelValue: true,
                },
                slots: {
                    default: 'Content',
                },
                global: {
                    stubs: ['Teleport'],
                },
            });

            // then
            expect(wrapper.html()).toContain('Content');
        });

        it('header slot을 전달하면 header 영역에 slot 컨텐츠가 렌더링 된다', () => {
            // given
            const wrapper = mount(VsModal, {
                props: {
                    modelValue: true,
                },
                slots: {
                    header: 'Header',
                },
                global: {
                    stubs: ['Teleport'],
                },
            });

            // then
            expect(wrapper.find('header').exists()).toBe(true);
            expect(wrapper.find('header').text()).toBe('Header');
        });

        it('footer slot을 전달하면 footer 영역에 slot 컨텐츠가 렌더링 된다', () => {
            // given
            const wrapper = mount(VsModal, {
                props: {
                    modelValue: true,
                },
                slots: {
                    footer: 'Footer',
                },
                global: {
                    stubs: ['Teleport'],
                },
            });

            // then
            expect(wrapper.find('footer').exists()).toBe(true);
            expect(wrapper.find('footer').text()).toBe('Footer');
        });
    });

    describe('has container', () => {
        it('has container prop을 전달하면 teleport가 비활성화된다', () => {
            // given
            const wrapper = mount(VsModal, {
                props: {
                    modelValue: true,
                    hasContainer: true,
                },
            });

            // then
            expect(wrapper.find('div').exists()).toBe(true);
        });
    });

    describe('dimmed', () => {
        it('dimmed 영역이 존재한다', () => {
            // given
            const wrapper = mount(VsModal, {
                props: {
                    modelValue: true,
                },
                global: {
                    stubs: ['Teleport'],
                },
            });

            // then
            expect(wrapper.find('div[aria-hidden="true"]').exists()).toBe(true);
        });

        it('dimmed 영역 클릭 시 modal이 닫힌다', async () => {
            // given
            const wrapper = mount(VsModal, {
                props: {
                    modelValue: true,
                },
                global: {
                    stubs: ['Teleport'],
                },
            });

            // when
            await wrapper.find('div[aria-hidden="true"]').trigger('click');

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toHaveLength(1);
            expect(updateModelValueEvent?.[0]).toEqual([false]);
        });

        it('close-on-dimmed-click prop을 false로 전달하면 dimmed 영역을 클릭해도 modal이 닫히지 않는다', async () => {
            // given
            const wrapper = mount(VsModal, {
                props: {
                    modelValue: true,
                    closeOnDimmedClick: false,
                },
                global: {
                    stubs: ['Teleport'],
                },
            });

            // when
            await wrapper.find('div[aria-hidden="true"]').trigger('click');

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toBe(undefined);
        });
    });

    describe('close on esc key', () => {
        it('esc key를 누르면 modal이 닫힌다', async () => {
            // given
            const wrapper = mount(VsModal, {
                props: {
                    modelValue: true,
                },
                global: {
                    stubs: ['Teleport'],
                },
                attachTo: document.body,
            });

            // when
            await wrapper.trigger('keydown.Escape');

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toHaveLength(1);
            expect(updateModelValueEvent?.[0]).toEqual([false]);
        });

        it('close-on-esc-key prop을 false로 전달하면 esc key를 눌러도 modal이 닫히지 않는다', async () => {
            // given
            const wrapper = mount(VsModal, {
                props: {
                    modelValue: true,
                    closeOnEscKey: false,
                },
                global: {
                    stubs: ['Teleport'],
                },
                attachTo: document.body,
            });

            // when
            await wrapper.trigger('keydown.Esc');

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toBe(undefined);
        });
    });
});
