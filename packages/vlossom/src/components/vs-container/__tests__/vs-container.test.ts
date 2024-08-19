import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { useLayout } from '@/composables';
import { VS_LAYOUT } from '@/declaration';
import { VsLayout } from '@/components';
import VsContainer from './../VsContainer.vue';

describe('vs-container', () => {
    describe('tag', () => {
        it('tag를 설정하면 해당 tag로 감싼다', () => {
            // given
            const wrapper = mount(VsContainer, {
                props: { tag: 'main' },
            });

            // when
            const tag = wrapper.find('.vs-container').element.tagName.toLowerCase();

            // then
            expect(tag).toBe('main');
        });
    });

    describe('grid', () => {
        it('rowGap을 단위와 함께 입력하면 rowGap style을 적용한다', () => {
            // when
            const wrapper = mount(VsContainer, {
                props: { grid: true, rowGap: '2rem' },
            });

            // then
            expect(wrapper.vm.gridStyles).toMatchObject({ rowGap: '2rem', columnGap: '0px' });
        });

        it('rowGap을 숫자로만 입력하면 px단위로 rowGap style을 적용한다', () => {
            // when
            const wrapper = mount(VsContainer, {
                props: { grid: true, rowGap: 20 },
            });

            // then
            expect(wrapper.vm.gridStyles).toMatchObject({ rowGap: '20px', columnGap: '0px' });
        });

        it('columnGap을 단위와 함께 입력하면 columnGap style을 적용한다', () => {
            // when
            const wrapper = mount(VsContainer, {
                props: { grid: true, columnGap: '2rem' },
            });

            // then
            expect(wrapper.vm.gridStyles).toMatchObject({ rowGap: '0px', columnGap: '2rem' });
        });

        it('columnGap을 숫자로만 입력하면 px단위로 columnGap style을 적용한다', () => {
            // when
            const wrapper = mount(VsContainer, {
                props: { grid: true, columnGap: 20 },
            });

            // then
            expect(wrapper.vm.gridStyles).toMatchObject({ rowGap: '0px', columnGap: '20px' });
        });
    });

    describe('layout', () => {
        // vs-layout의 name이 test 환경에서 'VTU_ROOT'로 변경되어 있어서 테스트가 불가능
        it.skip('vs-layout의 자식인 경우라면 layoutStyles에 header height, footer height만큼 padding을 설정한다', () => {
            // given
            const layoutProvide = useLayout().getDefaultLayoutProvide();
            layoutProvide.setHeaderLayout({ position: 'absolute', height: '100px' });
            layoutProvide.setFooterLayout({ position: 'absolute', height: '50px' });

            // when
            const containerWrapper = mount(VsContainer);
            mount(VsLayout, {
                global: {
                    provide: { [VS_LAYOUT]: layoutProvide },
                },
                slots: {
                    default: () => containerWrapper,
                },
            });

            // then
            expect(containerWrapper.vm.layoutStyles).toEqual({ paddingTop: '100px', paddingBottom: '50px' });
        });

        it('vs-layout의 자식이 아니라면 layoutStyles는 비어있다', () => {
            // given
            const layoutProvide = useLayout().getDefaultLayoutProvide();

            // when
            const wrapper = mount(VsContainer, {
                global: {
                    provide: { [VS_LAYOUT]: layoutProvide },
                },
                props: {
                    position: 'absolute',
                    height: '100px',
                },
            });

            // then
            expect(wrapper.vm.layoutStyles).toEqual({});
        });
    });
});
