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
            expect(wrapper.find('.vs-modal').exists()).toBe(false);
            expect(wrapper.vm.isOpen).toBe(false);
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

            expect(wrapper.find('.vs-modal').exists()).toBe(false);

            // when
            await wrapper.setProps({ modelValue: true });

            // then
            expect(wrapper.find('.vs-modal').exists()).toBe(true);
            expect(wrapper.vm.isOpen).toBe(true);
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
            expect(wrapper.find('.vs-modal-header').exists()).toBe(true);
            expect(wrapper.find('.vs-modal-header').text()).toBe('Header');
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
            expect(wrapper.find('.vs-modal-footer').exists()).toBe(true);
            expect(wrapper.find('.vs-modal-footer').text()).toBe('Footer');
        });
    });

    describe('aria attributes', () => {
        it('header slot이 있는 경우 modal의 aria-lablledby 속성 값이 <header>의 id 가 된다', () => {
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
            const modal = wrapper.find('.vs-modal-wrap');
            expect(modal.attributes('aria-labelledby')).toBe(wrapper.find('header').attributes('id'));
            expect(modal.attributes('aria-label')).toBe(undefined);
        });

        it('header slot이 없는 경우 modal의 aria-lablledby 속성이 없고 대신 aria-label 속성 값이 Modal이 된다', () => {
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
            const modal = wrapper.find('.vs-modal-wrap');
            expect(modal.attributes('aria-labelledby')).toBe(undefined);
            expect(modal.attributes('aria-label')).toBe('Modal');
        });

        it('modal body 요소의 id 값이 modal의 aria-describedby 속성 값이 된다', () => {
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
            const modal = wrapper.find('.vs-modal-wrap');
            expect(modal.attributes('aria-describedby')).toBe(wrapper.find('.vs-modal-body').attributes('id'));
        });

        it('aria-modal 속성이 있다', async () => {
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
            const modal = wrapper.find('.vs-modal-wrap');
            expect(modal.attributes('aria-modal')).toBe('true');
        });
    });

    describe('has container', () => {
        it('has container prop을 전달하면 teleport가 비활성화된다', () => {
            // given
            // stub teleport X
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
            expect(wrapper.find('.vs-modal-dimmed').exists()).toBe(true);
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
            await wrapper.find('.vs-modal-dimmed').trigger('click');

            // then
            expect(wrapper.vm.isOpen).toBe(false);
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
            await wrapper.find('.vs-modal-dimmed').trigger('click');

            // then
            expect(wrapper.vm.isOpen).toBe(true);
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
            expect(wrapper.vm.isOpen).toBe(false);
        });

        it('close-on-esc prop을 false로 전달하면 esc key를 눌러도 modal이 닫히지 않는다', async () => {
            // given
            const wrapper = mount(VsModal, {
                props: {
                    modelValue: true,
                    closeOnEsc: false,
                },
                global: {
                    stubs: ['Teleport'],
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
            const wrapper = mount(VsModal, {
                props: {
                    modelValue: true,
                },
                global: {
                    stubs: ['Teleport'],
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
                const wrapper = mount(VsModal, {
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
                expect(wrapper.find('.vs-modal').attributes('style')).toContain('--vs-modal-width: 270px;');
            });

            it('height', () => {
                // given
                const wrapper = mount(VsModal, {
                    props: {
                        modelValue: true,
                        size: '270px',
                        styleSet: { height: '320px' },
                    },
                    global: {
                        stubs: ['Teleport'],
                    },
                });

                // then
                expect(wrapper.find('.vs-modal').attributes('style')).toContain('--vs-modal-height: 270px;');
            });
        });
    });
});
