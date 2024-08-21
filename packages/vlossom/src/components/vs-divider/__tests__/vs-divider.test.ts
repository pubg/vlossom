import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsDivider from './../VsDivider.vue';

describe('vs-divider', () => {
    describe('horizontal / vertical', () => {
        it('vertical props를 설정하지 않으면 vs-horizontal class를 가진다', () => {
            // given
            const wrapper = mount(VsDivider);

            // then
            expect(wrapper.props('vertical')).toBe(false);
            expect(wrapper.classes('vs-horizontal')).toBe(true);
            expect(wrapper.classes('vs-vertical')).toBe(false);
        });

        it('vertical props를 true로 설정하면 vs-vertical class를 가진다', () => {
            // given
            const wrapper = mount(VsDivider, {
                props: {
                    vertical: true,
                },
            });

            // then
            expect(wrapper.props('vertical')).toBe(true);
            expect(wrapper.classes('vs-horizontal')).toBe(false);
            expect(wrapper.classes('vs-vertical')).toBe(true);
        });

        it('vertical props가 true일 때 verticalHeight style을 설정할 수 있다.', () => {
            // given
            const wrapper = mount(VsDivider, {
                props: {
                    vertical: true,
                    styleSet: { verticalHeight: '4rem' },
                },
            });

            // then
            expect(wrapper.classes('vs-horizontal')).toBe(false);
            expect(wrapper.classes('vs-vertical')).toBe(true);

            expect(wrapper.attributes().style.includes('--vs-divider-verticalHeight: 4rem;')).toBe(true);
        });
    });

    describe('responsive', () => {
        it('vertical과 responsive props를 설정하면 각각의 class를 가진다.', () => {
            //given
            const wrapper = mount(VsDivider, {
                props: {
                    vertical: true,
                    responsive: true,
                },
            });

            //then
            expect(wrapper.classes('vs-vertical')).toBe(true);
            expect(wrapper.classes('vs-divider-responsive')).toBe(true);
        });
    });
});
