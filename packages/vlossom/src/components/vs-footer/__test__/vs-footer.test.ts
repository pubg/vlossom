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

    describe('position', () => {
        it('컴포넌트에서 계산된 position이 absolute일 때, footer의 스타일에 bottom:0, left:0이 적용된다', async () => {
            // given
            const wrapper = mount(VsFooter);

            // when
            await wrapper.setProps({ position: 'absolute' });
            await nextTick();

            // then
            expect(wrapper.attributes().style.includes('bottom: 0;')).toBe(true);
            expect(wrapper.attributes().style.includes('left: 0;')).toBe(true);
        });

        it('컴포넌트에서 계산된 position이 fixed일 때, footer의 스타일에 bottom:0, left:0이 적용된다', async () => {
            // given
            const wrapper = mount(VsFooter);

            // when
            await wrapper.setProps({ position: 'fixed' });
            await nextTick();

            // then
            expect(wrapper.attributes().style.includes('bottom: 0;')).toBe(true);
            expect(wrapper.attributes().style.includes('left: 0;')).toBe(true);
        });
    });
});
