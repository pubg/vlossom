import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsBarNode from '../VsBarNode.vue';

describe('vs-bar-node', () => {
    describe('slot', () => {
        it('slot에 삽입된 내용을 보여준다', () => {
            // given
            const wrapper = mount(VsBarNode, {
                slots: {
                    default: 'This is slot content',
                },
            });

            // then
            expect(wrapper.html()).toContain('This is slot content');
        });
    });

    describe('height', () => {
        it('props height와 customProperties height가 둘다 있을 때, props height가 우선한다', () => {
            // given
            const wrapper = mount(VsBarNode, {
                props: {
                    colorScheme: 'default',
                    height: '100px',
                    customProperties: {
                        '--vs-header-height': '200px',
                    },
                },
            });

            // then
            expect(wrapper.attributes().style.includes('height: 100px;')).toBe(true);
        });

        it('props height가 없고 customProperties height가 있을 때, height는 customProperties height로 적용된다', () => {
            // given
            const wrapper = mount(VsBarNode, {
                props: {
                    colorScheme: 'default',
                    customProperties: {
                        '--vs-header-height': '200px',
                    },
                },
            });
            // then
            expect(wrapper.attributes().style.includes('height: 200px;')).toBe(true);
        });
    });

    describe('position', () => {
        it('props position과 customProperties position이 둘다 있을 때, props position이 우선한다', () => {
            // given
            const wrapper = mount(VsBarNode, {
                props: {
                    colorScheme: 'default',
                    position: 'absolute',
                    customProperties: {
                        '--vs-footer-position': 'relative',
                    },
                },
            });

            // then
            expect(wrapper.attributes().style.includes('position: absolute;')).toBe(true);
        });

        it('props position이 없고 customProperties position이 있을 때, position은 customProperties Position으로 적용된다', () => {
            // given
            const wrapper = mount(VsBarNode, {
                props: {
                    colorScheme: 'default',
                    customProperties: {
                        '--vs-footer-position': 'relative',
                    },
                },
            });

            // then
            expect(wrapper.attributes().style.includes('position: relative;')).toBe(true);
        });
    });

    describe('verticalAlign', () => {
        it('props verticalAlign:start일 때, 컴포넌트 스타일에 align-items: flex-start;가 적용된다 ', () => {
            //given
            const wrapper = mount(VsBarNode, {
                props: {
                    colorScheme: 'default',
                    verticalAlign: 'start',
                },
            });

            //then
            expect(wrapper.attributes().style.includes('align-items: flex-start;')).toBe(true);
        });

        it('props verticalAlign:end일 때, 컴포넌트 스타일에 align-items: flex-end;가 적용된다 ', () => {
            //given
            const wrapper = mount(VsBarNode, {
                props: {
                    colorScheme: 'default',
                    verticalAlign: 'end',
                },
            });

            //then
            expect(wrapper.attributes().style.includes('align-items: flex-end;')).toBe(true);
        });
    });
});