import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsDrawer from './../VsDrawer.vue';

describe('vs-drawer', () => {
    describe('v-model', () => {
        it('modelValue가 false이면 drawer가 열리지 않는다', async () => {
            // given
            const wrapper = mount(VsDrawer, {
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

        it('modelValue가 true이면 drawer가 열린다', async () => {
            // given
            const wrapper = mount(VsDrawer, {
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

        it('header slot을 전달하면 header 영역에 slot 컨텐츠가 렌더링 된다', () => {
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

        it('footer slot을 전달하면 footer 영역에 slot 컨텐츠가 렌더링 된다', () => {
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
        it('header slot이 있는 경우 aria-lablledby 속성 값이 <header>의 id 가 된다', () => {
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
            expect(wrapper.find('[aria-label]').exists()).toBe(false);
        });

        it('header slot이 없는 경우 aria-lablledby 속성이 없고 대신 aria-label 속성 값이 Dialog가 된다', () => {
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
            expect(wrapper.find('[aria-labelledby]').exists()).toBe(false);
        });

        it('dimmed 영역이 있는 경우 aria-modal 속성 값이 true가 된다', () => {
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
            expect(wrapper.find('[aria-modal]').exists()).toBe(true);
            expect(wrapper.find('[aria-modal]').attributes('aria-modal')).toBe('true');
        });
    });

    describe('has container', () => {
        it('has container prop을 전달하면 teleport가 비활성화된다', () => {
            // given
            const wrapper = mount(VsDrawer, {
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
            expect(wrapper.find('div[aria-hidden="true"]').exists()).toBe(true);
        });

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
            await wrapper.find('div[aria-hidden="true"]').trigger('click');

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toHaveLength(1);
            expect(updateModelValueEvent?.[0]).toEqual([false]);
        });
    });

    describe('close on esc key', () => {
        it('esc key를 누르면 drawer가 닫힌다', async () => {
            // given
            const wrapper = mount(VsDrawer, {
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
    });
});
