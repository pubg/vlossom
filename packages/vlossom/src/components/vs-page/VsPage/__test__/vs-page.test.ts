import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsPage from '../VsPage.vue';

describe('vs-page', () => {
    it('title, description slot을 모두 설정하지 않으면 page-header 영역이 없다 ', () => {
        // given
        const wrapper = mount(VsPage);

        // then
        expect(wrapper.find('.page-header').exists()).toBe(false);
    });

    it('slot으로 title을 설정할 수 있다 ', () => {
        // given
        const wrapper = mount(VsPage, {
            slots: {
                title: '<div>Title</div>',
            },
        });

        // then
        expect(wrapper.find('.page-header').exists()).toBe(true);
        expect(wrapper.find('.page-title').exists()).toBe(true);
        expect(wrapper.html()).toContain('<div>Title</div>');
    });

    it('slot으로 description을 설정할 수 있다 ', () => {
        // given
        const wrapper = mount(VsPage, {
            slots: {
                description: '<div>Description</div>',
            },
        });

        // then
        expect(wrapper.find('.page-header').exists()).toBe(true);
        expect(wrapper.find('.page-description').exists()).toBe(true);
        expect(wrapper.html()).toContain('<div>Description</div>');
    });
});
