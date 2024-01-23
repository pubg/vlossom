import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsDrawer from './../VsDrawer.vue';

describe('vs-drawer', () => {
    describe('slot', () => {
        it('default slot을 전달하면 body 영역에 slot이 렌더링 된다', () => {
            // given
            const wrapper = mount(VsDrawer, {
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
            expect(wrapper.find('#vs-drawer-body').text()).toBe('Content');
        });

        it('header slot을 전달하면 header 영역에 slot이 렌더링 된다', () => {
            // given
            const wrapper = mount(VsDrawer, {
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

        it('footer slot을 전달하면 footer 영역에 slot이 렌더링 된다', () => {
            // given
            const wrapper = mount(VsDrawer, {
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
        it('has container prop을 전달하면 drawer의 가장 상위 element의 position은 absolute가 된다', () => {
            // given
            const wrapper = mount(VsDrawer, {
                props: {
                    modelValue: true,
                    hasContainer: true,
                },
            });

            // then
            expect(wrapper.find('div').attributes().style).toBe('position: absolute;');
        });
    });

    describe('dimmed', () => {
        it('dimmed prop을 전달하면 dimmed 영역이 생긴다', () => {
            // given
            const wrapper = mount(VsDrawer, {
                props: {
                    modelValue: true,
                    dimmed: true,
                },
                global: {
                    stubs: ['Teleport'],
                },
            });

            // then
            expect(wrapper.find('[aria-hidden="true"]').exists()).toBe(true);
        });
    });

    describe('dimmed click', () => {
        it('dimmed 영역 클릭 시 drawer가 닫힌다', async () => {
            // given
            const wrapper = mount(VsDrawer, {
                props: {
                    modelValue: true,
                    dimmed: true,
                    closeOnDimmedClick: true,
                },
                global: {
                    stubs: ['Teleport'],
                },
            });

            // when
            await wrapper.find('[aria-hidden="true"]').trigger('click');

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toHaveLength(1);
            expect(updateModelValueEvent?.[0]).toEqual([false]);
        });
    });
});
