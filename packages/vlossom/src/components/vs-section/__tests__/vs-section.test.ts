import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VsSection from './../VsSection.vue';

describe('vs-section', () => {
    it('title slot을 설정하지 않으면 section-title 영역이 없다', () => {
        // given
        const wrapper = mount(VsSection);

        //then
        expect(wrapper.find('.section-title').exists()).toBe(false);
    });

    it('slot으로 title을 설정할 수 있다', () => {
        // given
        const wrapper = mount(VsSection, {
            slots: {
                title: '<div>Title</div>',
            },
        });

        // then
        expect(wrapper.find('.section-title').exists()).toBe(true);
        expect(wrapper.html()).toContain('<div>Title</div>');
    });

    it('default slot에 삽입된 내용을 보여준다', () => {
        // given
        const wrapper = mount(VsSection, {
            slots: {
                default: 'This is section content',
            },
        });

        // then
        expect(wrapper.html()).toContain('This is section content');
    });
});
