import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { useLayout } from '@/composables';
import { VS_LAYOUT } from '@/declaration';
import { VsLayout } from '@/components';
import VsFooter from './../VsFooter.vue';

describe('vs-footer', () => {
    describe('slot', () => {
        it('slot에 삽입된 내용을 보여준다', () => {
            // given
            const wrapper = mount(VsFooter, {
                slots: {
                    default: 'This is footer content',
                },
            });

            // then
            expect(wrapper.html()).toContain('This is footer content');
        });
    });

    describe('position', () => {
        it('컴포넌트에서 계산된 position이 absolute일 때, footer의 스타일에 bottom:0, left:0이 적용된다', async () => {
            // given
            const wrapper = mount(VsFooter);

            // when
            await wrapper.setProps({ position: 'absolute' });

            // then
            expect(wrapper.vm.computedStyleSet).includes({
                '--vs-footer-bottom': 0,
                '--vs-footer-left': 0,
            });
        });

        it('컴포넌트에서 계산된 position이 fixed일 때, footer의 스타일에 bottom:0, left:0이 적용된다', async () => {
            // given
            const wrapper = mount(VsFooter);

            // when
            await wrapper.setProps({ position: 'fixed' });

            // then
            expect(wrapper.vm.computedStyleSet).includes({
                '--vs-footer-bottom': 0,
                '--vs-footer-left': 0,
            });
        });

        it('사용자가 별도의 style-set으로 top, left 값을 지정할 경우에는 그 값이 반영된다', () => {
            // given
            const wrapper = mount(VsFooter, {
                props: {
                    styleSet: {
                        top: '10px',
                        left: '20px',
                    },
                },
            });

            // then
            expect(wrapper.vm.computedStyleSet).includes({
                '--vs-footer-top': '10px',
                '--vs-footer-left': '20px',
            });
        });
    });

    describe('layout', () => {
        // vs-layout의 name이 test 환경에서 'VTU_ROOT'로 변경되어 있어서 테스트가 불가능
        it.skip('vs-layout의 자식인 경우라면 layout provide에 footer layout 값을 세팅할 수 있다', () => {
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
                        mount(VsFooter, {
                            props: {
                                position: 'absolute',
                                height: '100px',
                            },
                        }),
                },
            });

            // then
            expect(setHeaderLayoutSpy).toHaveBeenCalledWith('absolute', '100px');
        });

        it('vs-layout의 자식이 아니라면 layout provide에 footer layout 값을 세팅하지 않는다', () => {
            // given
            const layoutProvide = useLayout().getDefaultLayoutProvide();
            const setFooterLayoutSpy = vi.spyOn(layoutProvide, 'setFooterLayout');

            // when
            mount(VsFooter, {
                global: {
                    provide: { [VS_LAYOUT]: layoutProvide },
                },
                props: {
                    position: 'absolute',
                    height: '100px',
                },
            });

            // then
            expect(setFooterLayoutSpy).not.toBeCalled();
        });
    });
});
