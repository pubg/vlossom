import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import VsDrawer from './../VsDrawer.vue';
import { useLayout } from '@/composables';
import { VsLayout } from '@/components';
import { VS_LAYOUT } from '@/declaration';

describe('vs-drawer', () => {
    describe('v-model', () => {
        it('modelValue가 false이면 drawer가 열리지 않는다', async () => {
            // given
            const wrapper = mount(VsDrawer, {
                props: {
                    modelValue: false,
                },
            });

            // then
            expect(wrapper.find('div.vs-dialog').exists()).toBe(false);
        });

        it('modelValue가 true이면 drawer가 열린다', async () => {
            // given
            const wrapper = mount(VsDrawer, {
                props: {
                    modelValue: false,
                },
            });

            expect(wrapper.find('div.vs-dialog').exists()).toBe(false);

            // when
            await wrapper.setProps({ modelValue: true });

            // then
            expect(wrapper.find('div.vs-dialog').exists()).toBe(true);
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
            });

            // then
            expect(wrapper.find('footer').exists()).toBe(true);
            expect(wrapper.find('footer').text()).toBe('Footer');
        });
    });

    describe('dimmed', () => {
        it('dimmed prop을 true로 전달하면 dimmed element가 노출된다', () => {
            // given
            const wrapper = mount(VsDrawer, {
                props: {
                    modelValue: true,
                    dimmed: true,
                },
            });

            // then
            expect(wrapper.find('div.dimmed').exists()).toBe(true);
        });

        it('기본적으로 dimmed 영역 클릭 시 drawer가 닫힌다', async () => {
            // given
            const wrapper = mount(VsDrawer, {
                props: {
                    modelValue: true,
                    dimmed: true,
                },
            });

            // when
            await wrapper.find('div.dimmed').trigger('click');

            // then
            expect(wrapper.vm.isOpen).toBe(false);
        });

        it('close-on-dimmed-click prop을 false로 전달하면 dimmed 영역을 클릭해도 drawer가 닫히지 않는다', async () => {
            // given
            const wrapper = mount(VsDrawer, {
                props: {
                    modelValue: true,
                    dimmed: true,
                    closeOnDimmedClick: false,
                },
            });

            // when
            await wrapper.find('div.dimmed').trigger('click');

            // then
            expect(wrapper.vm.isOpen).toBe(true);
        });
    });

    describe('close on esc key', () => {
        it('esc key를 누르면 drawer가 닫힌다', async () => {
            // given
            const wrapper = mount(VsDrawer, {
                props: {
                    modelValue: true,
                },
                attachTo: document.body,
            });

            // when
            await wrapper.trigger('keydown.Escape');

            // then
            expect(wrapper.vm.isOpen).toBe(false);
        });

        it('close-on-esc-key prop을 false로 전달하면 esc key를 눌러도 drawer가 닫히지 않는다', async () => {
            // given
            const wrapper = mount(VsDrawer, {
                props: {
                    modelValue: true,
                    closeOnEscKey: false,
                },
                attachTo: document.body,
            });

            // when
            await wrapper.trigger('keydown.Esc');

            // then
            expect(wrapper.vm.isOpen).toBe(true);
        });
    });

    describe('focus trap', () => {
        it('focus trap이 적용되어 있다', async () => {
            // given
            const wrapper = mount(VsDrawer, {
                props: {
                    modelValue: true,
                },
            });

            // then
            expect(wrapper.findComponent({ name: 'VsFocusTrap' }).exists()).toBe(true);
        });
    });

    describe('size', () => {
        describe('size prop이 style set 보다 우선된다', () => {
            it('width', () => {
                // given
                const wrapper = mount(VsDrawer, {
                    props: {
                        modelValue: true,
                        size: '270px',
                        styleSet: { width: '320px' },
                    },
                    global: {
                        stubs: ['Teleport'],
                    },
                });

                // then
                expect(wrapper.find('.vs-drawer').attributes('style')).toContain('--vs-drawer-width: 270px;');
            });

            it('height', () => {
                // given
                const wrapper = mount(VsDrawer, {
                    props: {
                        modelValue: true,
                        placement: 'top',
                        size: '270px',
                        styleSet: { height: '320px' },
                    },
                    global: {
                        stubs: ['Teleport'],
                    },
                });

                // then
                expect(wrapper.find('.vs-drawer').attributes('style')).toContain('--vs-drawer-height: 270px;');
            });
        });
    });

    describe('layout', () => {
        // vs-layout의 name이 test 환경에서 'VTU_ROOT'로 변경되어 있어서 테스트가 불가능
        it.skip('vs-layout의 자식인 경우라면 layout provide에 drawer layout 값을 세팅할 수 있다', () => {
            // given
            const layoutProvide = useLayout().getDefaultLayoutProvide();
            const setHeaderLayoutSpy = vi.spyOn(layoutProvide, 'setDrawerLayout');

            // when
            mount(VsLayout, {
                global: {
                    provide: { [VS_LAYOUT]: layoutProvide },
                },
                slots: {
                    default: () =>
                        mount(VsDrawer, {
                            props: {
                                modelValue: true,
                                position: 'absolute',
                                placement: 'right',
                                size: '100px',
                            },
                        }),
                },
            });

            // then
            expect(setHeaderLayoutSpy).toHaveBeenCalledWith({ drawerOpen: true, placement: 'right', height: '100px' });
        });

        it('vs-layout의 자식이 아니라면 layout provide에 header layout 값을 세팅하지 않는다', () => {
            // given
            const layoutProvide = useLayout().getDefaultLayoutProvide();
            const setHeaderLayoutSpy = vi.spyOn(layoutProvide, 'setHeaderLayout');

            // when
            mount(VsDrawer, {
                global: {
                    provide: { [VS_LAYOUT]: layoutProvide },
                },
                props: {
                    modelValue: true,
                    position: 'absolute',
                    placement: 'right',
                    size: '100px',
                },
            });

            // then
            expect(setHeaderLayoutSpy).not.toBeCalled();
        });
    });
});
