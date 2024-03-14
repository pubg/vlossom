import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsValueTag from '../VsValueTag.vue';

describe('vs-value-tag', () => {
    it('slot으로 label, value를 설정할 수 있다', () => {
        //given
        const wrapper = mount(VsValueTag, {
            slots: {
                label: 'MyLabel',
                value: 'MyValue',
            },
        });

        //then
        expect(wrapper.find('.label').exists()).toBe(true);
        expect(wrapper.find('.value').exists()).toBe(true);
        expect(wrapper.html()).toContain('MyLabel');
        expect(wrapper.html()).toContain('MyValue');
    });
});
