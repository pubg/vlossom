import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsContainer from './../VsContainer.vue';

describe('vs-container', () => {
    describe('container style', () => {
        it('rowGap을 단위와 함께 입력하면 rowGap style을 적용한다', () => {
            // when
            const wrapper = mount(VsContainer, {
                props: { rowGap: '2rem' },
            });

            // then
            expect(wrapper.vm.containerStyle).toEqual({ rowGap: '2rem', columnGap: '0px' });
        });

        it('rowGap을 숫자로만 입력하면 px단위로 rowGap style을 적용한다', () => {
            // when
            const wrapper = mount(VsContainer, {
                props: { rowGap: 20 },
            });

            // then
            expect(wrapper.vm.containerStyle).toEqual({ rowGap: '20px', columnGap: '0px' });
        });

        it('columnGap을 단위와 함께 입력하면 columnGap style을 적용한다', () => {
            // when
            const wrapper = mount(VsContainer, {
                props: { columnGap: '2rem' },
            });

            // then
            expect(wrapper.vm.containerStyle).toEqual({ rowGap: '0px', columnGap: '2rem' });
        });

        it('columnGap을 숫자로만 입력하면 px단위로 columnGap style을 적용한다', () => {
            // when
            const wrapper = mount(VsContainer, {
                props: { columnGap: 20 },
            });

            // then
            expect(wrapper.vm.containerStyle).toEqual({ rowGap: '0px', columnGap: '20px' });
        });
    });
});
