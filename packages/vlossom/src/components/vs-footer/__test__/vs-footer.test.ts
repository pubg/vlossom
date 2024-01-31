import { nextTick } from 'vue';
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsFooter from '../VsFooter.vue';

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

    describe('verticalAlign', () => {
        it('props verticalAlign:start일 때, footer의 스타일에 align-items: flex-start;가 적용된다 ', () => {
            //given
            const wrapper = mount(VsFooter, {
                props: {
                    verticalAlign: 'start',
                },
            });

            //then
            expect(wrapper.attributes().style.includes('align-items: flex-start;')).toBe(true);
        });

        it('props verticalAlign:end일 때, footer의 스타일에 align-items: flex-end;가 적용된다 ', () => {
            //given
            const wrapper = mount(VsFooter, {
                props: {
                    verticalAlign: 'end',
                },
            });

            //then
            expect(wrapper.attributes().style.includes('align-items: flex-end;')).toBe(true);
        });
    });

    describe('height', () => {
        it('props height와 styleSet height가 둘다 있을 때, props height가 우선한다', () => {
            // given
            const wrapper = mount(VsFooter, {
                props: {
                    height: '100px',
                    styleSet: {
                        height: '200px',
                    },
                },
            });

            // then
            expect(wrapper.attributes().style.includes('height: 100px;')).toBe(true);
        });

        it('props height가 없고 styleSet height가 있을 때, height는 styleSet height로 적용된다', () => {
            // given
            const wrapper = mount(VsFooter, {
                props: {
                    styleSet: {
                        height: '200px',
                    },
                },
            });

            // then
            expect(wrapper.attributes().style.includes('height: 200px;')).toBe(true);
        });
    });

    describe('position', () => {
        it('props position과 styleSet position이 둘다 있을 때, props position이 우선한다', () => {
            // given
            const wrapper = mount(VsFooter, {
                props: {
                    position: 'absolute',
                    styleSet: {
                        position: 'relative',
                    },
                },
            });

            // then
            expect(wrapper.attributes().style.includes('position: absolute;')).toBe(true);
        });

        it('props position이 없고 styleSet position이 있을 때, position은 styleSet Position으로 적용된다', () => {
            // given
            const wrapper = mount(VsFooter, {
                props: {
                    styleSet: {
                        position: 'relative',
                    },
                },
            });

            // then
            expect(wrapper.attributes().style.includes('position: relative;')).toBe(true);
        });

        it('컴포넌트에서 계산된 position이 absolute일 때, footer의 스타일에 bottom:0, left:0이 적용된다', async () => {
            // given
            const wrapper = mount(VsFooter);

            // when
            await wrapper.setProps({ position: 'absolute' });
            await nextTick();

            // then
            expect(wrapper.attributes().style.includes('--vs-footer-bottom: 0;')).toBe(true);
            expect(wrapper.attributes().style.includes('--vs-footer-left: 0;')).toBe(true);
        });

        it('컴포넌트에서 계산된 position이 fixed일 때, footer의 스타일에 bottom:0, left:0이 적용된다', async () => {
            // given
            const wrapper = mount(VsFooter);

            // when
            await wrapper.setProps({ position: 'fixed' });
            await nextTick();

            // then
            expect(wrapper.attributes().style.includes('--vs-footer-bottom: 0;')).toBe(true);
            expect(wrapper.attributes().style.includes('--vs-footer-left: 0;')).toBe(true);
        });
    });
});
