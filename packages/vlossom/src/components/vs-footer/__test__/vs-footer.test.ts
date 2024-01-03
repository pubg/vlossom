import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsFooter from '../VsFooter.vue';

describe('vs-footer', () => {
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
