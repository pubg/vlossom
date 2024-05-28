import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Vsblock from './../VsBlock.vue';

describe('vs-block', () => {
    it('title slot을 설정하지 않으면 block-header 영역이 없다', () => {
        // given
        const wrapper = mount(Vsblock);

        //then
        expect(wrapper.find('.block-header').exists()).toBe(false);
    });

    it('slot으로 title을 설정할 수 있다', () => {
        // given
        const wrapper = mount(Vsblock, {
            slots: {
                title: '<div>Title</div>',
            },
        });

        // then
        expect(wrapper.find('.block-header').exists()).toBe(true);
        expect(wrapper.html()).toContain('<div>Title</div>');
    });

    it('default slot에 삽입된 내용을 보여준다', () => {
        // given
        const wrapper = mount(Vsblock, {
            slots: {
                default: 'This is block content',
            },
        });

        // then
        expect(wrapper.html()).toContain('This is block content');
    });
});
