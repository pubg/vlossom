import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsLabelValue from './../VsLabelValue.vue';

describe('vs-label-value', () => {
    it('slot으로 label, value를 설정할 수 있다', () => {
        //given
        const wrapper = mount(VsLabelValue, {
            slots: {
                label: 'MyLabel',
                value: 'MyValue',
            },
        });

        //then
        expect(wrapper.find('.vs-label').exists()).toBe(true);
        expect(wrapper.find('.vs-value').exists()).toBe(true);
        expect(wrapper.html()).toContain('MyLabel');
        expect(wrapper.html()).toContain('MyValue');
    });

    it('slot으로 actions를 설정할 수 있다', () => {
        //given
        const wrapper = mount(VsLabelValue, {
            slots: {
                actions: '<div>action</div>',
            },
        });

        //then
        expect(wrapper.find('.vs-actions').exists()).toBe(true);
        expect(wrapper.html()).toContain('<div>action</div>');
    });
});
