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
        expect(wrapper.find('.label').exists()).toBe(true);
        expect(wrapper.find('.value').exists()).toBe(true);
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
        expect(wrapper.find('.actions').exists()).toBe(true);
        expect(wrapper.html()).toContain('<div>action</div>');
    });

    it('props verticalAlign:top일 때, label, value, actions의 스타일에 align-items: flex-start;가 적용된다 ', () => {
        //given
        const wrapper = mount(VsLabelValue, {
            slots: {
                label: 'MyLabel',
                value: 'MyValue',
                actions: '<div>action</div>',
            },
            props: {
                verticalAlign: 'top',
            },
        });

        //then
        expect(wrapper.find('.label').attributes().style.includes('align-items: flex-start;')).toBe(true);
        expect(wrapper.find('.value').attributes().style.includes('align-items: flex-start;')).toBe(true);
        expect(wrapper.find('.actions').attributes().style.includes('align-items: flex-start;')).toBe(true);
    });

    it('props verticalAlign:bottom일 때, label, value, actions의 스타일에 align-items: flex-end;가 적용된다 ', () => {
        //given
        const wrapper = mount(VsLabelValue, {
            slots: {
                label: 'MyLabel',
                value: 'MyValue',
                actions: '<div>action</div>',
            },
            props: {
                verticalAlign: 'bottom',
            },
        });

        //then
        expect(wrapper.find('.label').attributes().style.includes('align-items: flex-end;')).toBe(true);
        expect(wrapper.find('.value').attributes().style.includes('align-items: flex-end;')).toBe(true);
        expect(wrapper.find('.actions').attributes().style.includes('align-items: flex-end;')).toBe(true);
    });
});
