import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { useLayout } from '@/composables';
import { VS_LAYOUT } from '@/declaration';
import { VsLayout } from '@/components';
import VsHeader from './../VsHeader.vue';

describe('vs-header', () => {
    describe('slot', () => {
        it('slot에 삽입된 내용을 보여준다', () => {
            // given
            const wrapper = mount(VsHeader, {
                slots: {
                    default: 'This is header content',
                },
            });

            // then
            expect(wrapper.html()).toContain('This is header content');
        });
    });

    describe('position', () => {
        it('컴포넌트에서 계산된 position이 absolute일 때, header의 스타일에 top:0, left:0이 적용된다', async () => {
            // given
            const wrapper = mount(VsHeader);

            // when
            await wrapper.setProps({ position: 'absolute' });

            // then
            expect(wrapper.vm.computedStyleSet).includes({
                '--vs-header-top': 0,
                '--vs-header-left': 0,
            });
        });

        it('컴포넌트에서 계산된 position이 fixed일 때, header의 스타일에 top:0, left:0이 적용된다', async () => {
            // given
            const wrapper = mount(VsHeader);

            // when
            await wrapper.setProps({ position: 'fixed' });

            // then
            expect(wrapper.vm.computedStyleSet).includes({
                '--vs-header-top': 0,
                '--vs-header-left': 0,
            });
        });

        it('사용자가 별도의 style-set으로 top, left 값을 지정할 경우에는 그 값이 반영된다', () => {
            // given
            const wrapper = mount(VsHeader, {
                props: {
                    styleSet: {
                        top: '10px',
                        left: '20px',
                    },
                },
            });

            // then
            expect(wrapper.vm.computedStyleSet).includes({
                '--vs-header-top': '10px',
                '--vs-header-left': '20px',
            });
        });
    });

    describe('layout', () => {
        // vs-layout의 name이 test 환경에서 'VTU_ROOT'로 변경되어 있어서 테스트가 불가능
        it.skip('vs-layout의 자식인 경우라면 layout provide에 header layout 값을 세팅할 수 있다', () => {
            // given
            const layoutProvide = useLayout().getDefaultLayoutProvide();
            const setHeaderLayoutSpy = vi.spyOn(layoutProvide, 'setHeaderLayout');

            // when
            mount(VsLayout, {
                global: {
                    provide: { [VS_LAYOUT]: layoutProvide },
                },
                slots: {
                    default: () =>
                        mount(VsHeader, {
                            props: {
                                position: 'absolute',
                                height: '100px',
                            },
                        }),
                },
            });

            // then
            expect(setHeaderLayoutSpy).toHaveBeenCalledWith({ position: 'absolute', height: '100px' });
        });

        it('vs-layout의 자식이 아니라면 layout provide에 header layout 값을 세팅하지 않는다', () => {
            // given
            const layoutProvide = useLayout().getDefaultLayoutProvide();
            const setHeaderLayoutSpy = vi.spyOn(layoutProvide, 'setHeaderLayout');

            // when
            mount(VsHeader, {
                global: {
                    provide: { [VS_LAYOUT]: layoutProvide },
                },
                props: {
                    position: 'absolute',
                    height: '100px',
                },
            });

            // then
            expect(setHeaderLayoutSpy).not.toBeCalled();
        });
    });
});
