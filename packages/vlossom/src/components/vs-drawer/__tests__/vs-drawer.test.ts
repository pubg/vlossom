import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsDrawer from './../VsDrawer.vue';

describe('vs-drawer', () => {
    describe('slot', () => {
        it('default slot을 전달하면 slot이 렌더링 된다', () => {
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
            expect(wrapper.html()).toContain('Content');
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

    describe('aria attributes', () => {
        it('header slot이 있는 경우 aria-lablledby 속성 값이 <header> 의 id 가 된다', () => {
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
            expect(wrapper.find('[aria-labelledby]').exists()).toBe(true);
            expect(wrapper.find('[aria-labelledby]').attributes('aria-labelledby')).toBe(
                wrapper.find('header').attributes('id'),
            );
            expect(wrapper.find('[aria-label]').attributes('aria-label')).toBe('');
        });

        it('header slot이 없는 경우 aria-lablledby 속성 값이 없고 aria-label 값이 Dialog가 된다', () => {
            // given
            const wrapper = mount(VsDrawer, {
                props: {
                    modelValue: true,
                },
                global: {
                    stubs: ['Teleport'],
                },
            });

            // then
            expect(wrapper.find('[aria-label]').exists()).toBe(true);
            expect(wrapper.find('[aria-label]').attributes('aria-label')).toBe('Dialog');
            expect(wrapper.find('[aria-labelledby]').attributes('aria-labelledby')).toBe('');
        });
    });

    describe('has container', () => {
        it('has container prop을 전달하면 drawer 가장 상위 element에 클래스가 추가된다', () => {
            // given
            const wrapper = mount(VsDrawer, {
                props: {
                    modelValue: true,
                    hasContainer: true,
                },
            });

            // then
            expect(wrapper.find('.has-container').exists()).toBe(true);
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
        it('close-on-dimmed-click prop을 전달하고 dimmed 영역 클릭 시 drawer가 닫힌다', async () => {
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
